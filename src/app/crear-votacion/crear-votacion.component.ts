import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VotacionesService } from 'src/servicios/votaciones.service';
import { MatListOption } from '@angular/material/list'
import  Swal  from 'sweetalert2'
import { wsServices } from 'src/servicios/ws-service';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog-service';
import { ToastService } from '../_services/toast.service';

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
  
  
  constructor(public toastService: ToastService,private confirmationDialogService: ConfirmationDialogService,private servicioVotaciones: VotacionesService, private router: Router, private _wsService: wsServices) { }

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
      this.votacion.descripcion, this.votacion.nombrePropuso, this.date, 0, 0, 0, 1, this.votacion.votantes);
    this.router.navigate(["main-menu/historial-votaciones"])
    let fecha = this.date.getFullYear() + "-" + this.date.getMonth() + "-" + this.date.getDate()
    let votantes = []
    for(let i=0; i< this.votacion.votantes.length;i++){
      votantes.push(this.votacion.votantes[i]["nombre"])
    }
    if(this.votacion.tipo == "1"){
      this._wsService.crearVotacion(this.votacion.descripcion, this.votacion.nombrePropuso, this.votacion.codigoAcceso,
        this.votacion.codigoConsejo, 1, fecha, this.votacion.votantes).subscribe(
          result => {
            this.showSuccess()
            console.log(result)
          },
          error => {
            this.showError();
            console.log(error);
          }
        );
    }
    if(this.votacion.tipo == "0"){
      this._wsService.crearVotacion(this.votacion.descripcion, this.votacion.nombrePropuso, this.votacion.codigoAcceso,
        this.votacion.codigoConsejo, 0, fecha, this.votacion.votantes).subscribe(
          result => {
            this.showSuccess()
            console.log(result)
          },
          error => {
            this.showError();
            console.log(error);
          }
        );
    }
  }

  onGroupsChange(options: MatListOption[]) {
    // map these MatListOptions to their values
    this.votacion.votantes = options.map(o => o.value);
    console.log(this.votacion.votantes)
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

  public openConfirmationDialog() {
    if(this.votacion.tipo === '' || this.votacion.codigoAcceso === '' ||
    this.votacion.codigoConsejo === '' || this.votacion.descripcion === '' || this.votacion.nombrePropuso === '' || this.votacion.votantes.length == 0){
      this.showError()
    }
    else{
      this.confirmationDialogService.confirm('Por favor confirma', `¿Quieres crear la votación?`)
    .then((confirmed) => {
      if(confirmed === true){
        this.crearVotacion()
      }
    })
    .catch(() => 
      console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
    }
  }

  showSuccess() {
    this.toastService.show(`votación creada correctamente.!`, {
      classname: 'bg-success text-light',
      delay: 5000 ,
      autohide: true,
      headertext: 'LOGIN'
    });
  }

  showError() {
    this.toastService.show('Ha habido un problema al crear la votación, favor intente de nuevo.!', {
      classname: 'bg-danger text-light',
      delay: 5000 ,
      autohide: true,
      headertext: 'Error!!!'
    });
  }

}
