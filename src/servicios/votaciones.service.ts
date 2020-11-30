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

  constructor(private _wsService: wsServices) { }

  cargarVotaciones(id, tipo, codigoAcceso, codigoConsejo, descripcion, nombrePropuso, nombreVotante, date, votantes){
    this.votaciones.push({
      id: id,
      tipo: tipo,
      codigoAcceso: codigoAcceso,
      codigoConsejo: codigoConsejo,
      descripcion: descripcion,
      nombrePropuso: nombrePropuso,
      nombreVotante: nombreVotante,
      date: date,
      favor: 0,
      encontra: 0,
      abstencion: 0,
      status: "Pausada",
      votantes: votantes
    })
  }

  agregarVotante(nombre, identificador, tipo) {
    var encontrado = false;
    if (this.votantes.length == 0) {
      this.votantes.push({nombre: nombre, identificador: identificador, tipo: tipo})
    }
    else {
      for (var i=0; i < this.votantes.length; i++) {
        console.log(this.votantes[i].identificador + " " + identificador)
        if (this.votantes[i].identificador == identificador){
          encontrado = true;
        }
      }
      if (encontrado==false){
        this.votantes.push({nombre: nombre, identificador: identificador, tipo: tipo})
      }
    }
  }

  eliminarVotante (identificador) {
    for (var i=0; i < this.votantes.length; i++) {
      if (this.votantes[i].identificador == identificador){
        console.log("Id encontrado para eliminar> " + this.votantes[i].identificador)
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
}
