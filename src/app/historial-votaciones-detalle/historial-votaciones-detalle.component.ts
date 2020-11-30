import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VotacionesService } from 'src/servicios/votaciones.service';
import { Votaciones } from '../interfaces/votaciones';
import { Router } from '@angular/router';
import { wsServices } from 'src/servicios/ws-service';

@Component({
  selector: 'app-historial-votaciones-detalle',
  templateUrl: './historial-votaciones-detalle.component.html',
  styleUrls: ['./historial-votaciones-detalle.component.css']
})
export class HistorialVotacionesDetalleComponent implements OnInit {

  public detalleVotacion: Votaciones
  public estudianteId;
  public editando = 'no';

  constructor(private route: ActivatedRoute, private servicioVotaciones: VotacionesService, private router: Router, private _wsService: wsServices) { 
    this.detalleVotacion = {
      id: '',
      tipo: '',
      codigoAcceso: '',
      codigoConsejo: '',
      descripcion: '',
      nombrePropuso: '',
      nombreVotante: '',
      date: '',
      favor: 0,
      encontra: 0,
      abstencion: 0,
      status: '', // espera - iniciada - terminada,
      votantes: [{nombre:1, identificador:2}]
    };
  }

  ngOnInit(): void {
    // Get the id of the note from the URL
    this.estudianteId = this.route.snapshot.paramMap.get('id');
    this.detalleVotacion = this.servicioVotaciones.getDetalleVotacion(this.estudianteId);
  }

  cambiarEstado1(){
    this.editando = 'si'
  }
  cambiarEstado2(){
    this.editando = 'no'
  }

  modificarVotacion(){
    this._wsService.modificarVotacion(this.detalleVotacion.codigoAcceso, this.detalleVotacion.codigoConsejo, 
      this.detalleVotacion.descripcion, this.detalleVotacion.nombrePropuso).subscribe(result => {
        console.log(result)
        this.cambiarEstado2()
        ,
        error => {
          console.log(error);
        }
      })
    this.cambiarEstado2()
  }

  eliminarVotacion(){
    console.log("ID ENVIADO: "+ this.detalleVotacion.id)
    this.servicioVotaciones.eliminarVotacion(this.detalleVotacion.id)
    this._wsService.eliminarVotacion(this.detalleVotacion.codigoAcceso, this.detalleVotacion.codigoConsejo).subscribe(result => {
      console.log(result)
      ,error => {
        console.log(error)
      }
    })
    this.volverMenuPrincipal() 
  }

  iniciarVotacion(){
    this.detalleVotacion.status = 'Abierta'
    this._wsService.iniciarVotacion(this.detalleVotacion.codigoAcceso, this.detalleVotacion.codigoConsejo).subscribe(result => {
      console.log(result)
      ,error => {
        console.log(error)
      }
    });
  }
  detenerVotacion(){
    this.detalleVotacion.status = 'Cerrada'
  }

  volverMenuPrincipal(){
    this.router.navigate(["main-menu/historial-votaciones"])
  }

}
