import { Injectable } from '@angular/core';
import { Votaciones } from '../app/interfaces/votaciones'
import  Swal  from 'sweetalert2'
import { wsServices } from './ws-service';

@Injectable({
  providedIn: 'root'
})
export class VotacionesService {

  public votaciones: Votaciones[] = [];
  public votantes = []
  public professors = []
  public votingHistory = []

  constructor(private _wsService: wsServices) { }

  cargarVotaciones(id, tipo, codigoAcceso, codigoConsejo, descripcion, nombrePropuso, date, favor, encontra, abstencion, estado, votantes){
    this.votaciones.unshift({
      id: id,
      tipo: tipo, 
      codigoAcceso: codigoAcceso, 
      codigoConsejo: codigoConsejo,
      descripcion: descripcion,
      nombrePropuso: nombrePropuso,
      date: date,
      favor: favor,
      encontra: encontra,
      abstencion: abstencion,
      status: estado, // 2 is Active, 0 is close, 1 is ready to open.
      votantes: votantes
    })
  }
 
  agregarVotante(nombre, identificador, tipo) { // Tipo = profesor / estudiante
    var encontrado = false;
    if (this.votantes.length == 0) {
      this.votantes.push({name: nombre, identifier: identificador, type: tipo})
    }
    else {
      for (var i=0; i < this.votantes.length; i++) {
        if (this.votantes[i].identifier == identificador){
          encontrado = true;
        }
      }
      if (encontrado==false){
        this.votantes.push({name: nombre, identifier: identificador, type: tipo})
      }
    }
  }

  eliminarVotante (identificador) {
    for (var i=0; i < this.votantes.length; i++) {
      if (this.votantes[i].identifier == identificador){
        console.log("Id encontrado para eliminar> " + this.votantes[i].identifier)
        this.votantes.splice(i, 1)
      }
    }
    console.log("Lista con elemento/s borrados" + this.votantes)
  }

  getDetalleVotacion(id): Votaciones {
    return this.votaciones.find(votacion => votacion.id === id);
  }

  eliminarVotacion(identificador){
    console.log("ID RECIBIDO: " + identificador)
    console.log("Votaciones: " + JSON.stringify(this.votaciones))
    for (var i=0; i < this.votaciones.length; i++) {
      console.log("ID BUSCANDO: " + this.votaciones[i].id)
      if (this.votaciones[i].id == identificador){
        console.log("Id encontrado para eliminar> " + this.votaciones[i].id)
        this.votaciones.splice(i, 1)
      }
    }
    console.log("Votaciones: " + JSON.stringify(this.votaciones))
  }

  getProfessorsAPI(){
    this._wsService.getProfessors().subscribe( data => {
      this.professors = data['data']
      this.getProfessors()
    });
  }

  getProfessors(){
    for (let i = 0; i < this.professors.length; i++){
      this.agregarVotante(this.professors[i].name, this.professors[i].identifier, 0)
    }
  }

  getVotingHistoryAPI(callback){
    this._wsService.getVotingHistory().subscribe( data => {
      this.votingHistory = data['data']
      this.getVotingHistory();
      callback();
    })
  }

  getVotingHistory(){
    this.votaciones = []
    for (let i = 0; i < this.votingHistory.length; i++){
      let id = this.votaciones.length.toString();
      let v = this.votingHistory[i];
      this.cargarVotaciones(id, v.voteType, v.accessCode, v.councilCode, v.description, v.whoProposed, v.voteDate, v.totalAgree, v.totalDisagree, v.totalAgainst, v.voteState, v.voters);
    }
  }

}
