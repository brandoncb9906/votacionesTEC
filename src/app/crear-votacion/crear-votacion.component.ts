import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VotacionesService } from 'src/servicios/votaciones.service';
import { MatListOption } from '@angular/material/list'
import  Swal  from 'sweetalert2'
import { wsServices } from 'src/servicios/ws-service';

@Component({
  selector: 'app-crear-votacion',
  templateUrl: './crear-votacion.component.html',
  styleUrls: ['./crear-votacion.component.css']
})
export class CrearVotacionComponent implements OnInit {
  
  public votacion = {
    id: '',
    tipo: '',
    codigoAcceso: '',
    codigoConsejo: '',
    descripcion: '',
    nombrePropuso: '',
    nombreVotante: '',
    votantes: []
  }
  
  votantes = [];

  date = new Date();
  
  
  constructor(private servicioVotaciones: VotacionesService, private router: Router, private _wsService: wsServices) { }

  ngOnInit(): void {
    this.votacion.codigoAcceso = this.generaPass();
    this.votacion.codigoConsejo = "dhgfdm323";
    this.votacion.descripcion = "";
    this.votantes = [];
    this.votantes = this.servicioVotaciones.votantes;
  }

  onItemChange(value){
    this.votacion.tipo = value;
  }

  crearVotacion(){
    console.log(this.votacion)
    this.votacion.id = this.servicioVotaciones.votaciones.length.toString();
    this.servicioVotaciones.cargarVotaciones(this.votacion.id, this.votacion.tipo, this.votacion.codigoAcceso, this.votacion.codigoConsejo,
      this.votacion.descripcion, this.votacion.nombrePropuso, this.votacion.nombreVotante, this.date, this.votacion.votantes);
    this.router.navigate(["main-menu/historial-votaciones"])
    //console.log("VOTANTES> " + this.votacion.votantes)
      /*  
    accesCode: accesCode,
    adviceCode:adviceCode,
    descripcion: descripcion,
    date: date,
    favor: favor,
    against: against,
    abstain: abstain,
    nameProposedPoint: nameProposedPoint,
    status: 0, // 0 pausada 1 abierta 2 cerrada 
    listvotantes: listvotantes,
    votacionType: votacionType // 10 privada / 20 publica
    */
    let fecha = this.date.getFullYear() + "-" + this.date.getMonth() + "-" + this.date.getDate()
    let votantes = []
    for(let i=0; i< this.votacion.votantes.length;i++){
      votantes.push(this.votacion.votantes[i]["nombre"])
    }
    if(this.votacion.tipo == "publica"){
      this._wsService.crearVotacion(this.votacion.codigoAcceso, this.votacion.codigoConsejo, this.votacion.descripcion,
        fecha, 0, 0, 0, this.votacion.nombrePropuso, 0, votantes, 20).subscribe(
          result => {
            //console.log(result)
          },
          error => {
            //console.log(error);
          }
        );
    }
    if(this.votacion.tipo == "privada"){
      this._wsService.crearVotacion(this.votacion.codigoAcceso, this.votacion.codigoConsejo, this.votacion.descripcion,
        fecha, 0, 0, 0, this.votacion.nombrePropuso, 0, this.votantes, 10).subscribe(result => {
          
      })
    }
     
  }

  onGroupsChange(options: MatListOption[]) {
    // map these MatListOptions to their values
    this.votacion.votantes = options.map(o => o.value);
    //console.log(this.votacion.votantes)
  }

  generaPass() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < 6; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  volver(){
    this.router.navigate(["main-menu/historial-votaciones"])
  }

}
