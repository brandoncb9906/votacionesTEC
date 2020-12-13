import { Component, OnInit } from '@angular/core';
import { VotacionesService } from 'src/servicios/votaciones.service';
import {FormControl} from '@angular/forms';
import { MatListOption } from '@angular/material/list'
import { wsServices } from 'src/servicios/ws-service';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog-service';
import { ToastService } from '../_services/toast.service';

@Component({
  selector: 'app-votantes',
  templateUrl: './votantes.component.html',
  styleUrls: ['./votantes.component.css']
})
export class VotantesComponent implements OnInit {

  public nombre = "";
  public id = "";
  public tipo = "";
  disableSelect = new FormControl(true);
  public votantes: string[] = [];
  public votantesEliminar = []

  constructor(public toastService: ToastService,private confirmationDialogService: ConfirmationDialogService,
    private servicioVotaciones: VotacionesService, private _wsService: wsServices) { }

  ngOnInit(): void {
    this.votantes = [];
    this.servicioVotaciones.getProfessorsAPI()
    this.votantes = this.servicioVotaciones.votantes;
  }

  agregarVotante(){
    this.servicioVotaciones.agregarVotante(this.nombre, this.id, this.tipo) // Tipo = profesor = 0 / estudiante = 1
    let config = {name: this.nombre, identifier: this.id, type: this.tipo}
    //console.log(config);
    this._wsService.agregarVotante(config).subscribe(
      data => {
        if(data['msg'] === 0){
          this.showSuccess()
        }
      },
      error => {
        console.log('Error en la consulta');
      }
    );
  }

  onItemChange(value){
    this.tipo = value;
  }

  onGroupsChange(options: MatListOption[]) {
    // map these MatListOptions to their values
    this.votantesEliminar = options.map(o => o.value)
    if (this.votantesEliminar.length > 0) {
      this.disableSelect.setValue(false);
    }
    else {
      this.disableSelect.setValue(true);
    }
  }

  eliminarVotante(){
    console.log("Lista completa>" + this.servicioVotaciones.votantes)
    console.log("Lista elemntos a eliminar>" + this.votantesEliminar)
    for (var i = 0; i < this.votantesEliminar.length; i++) {
      var id = this.votantesEliminar[i].identifier;
      console.log("Id a eliminar> " + id)
      this.servicioVotaciones.eliminarVotante(id);
    }
  }

  public openConfirmationDialog() {
    if(this.nombre === null || this.id === "" || this.tipo === ""){
      this.showError()
    }
    else{
      this.confirmationDialogService.confirm('Por favor confirma', `Quieres agregar a ${this.nombre}: ${this.id}`)
    .then((confirmed) => {
      if(confirmed === true){
        this.agregarVotante()
      }
    })
    .catch(() => 
      console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
    }
  }

  showSuccess() {
    this.toastService.show(`Votante agregado correctamente`, {
      classname: 'bg-success text-light',
      delay: 5000 ,
      autohide: true,
      headertext: 'LOGIN'
    });
  }

  showError() {
    this.toastService.show('Por favor completar todos los datos.!', {
      classname: 'bg-danger text-light',
      delay: 5000 ,
      autohide: true,
      headertext: 'Error!!!'
    });
  }
}
