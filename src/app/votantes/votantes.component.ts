import { Component, OnInit } from '@angular/core';
import { VotacionesService } from 'src/servicios/votaciones.service';
import {FormControl} from '@angular/forms';
import { MatListOption } from '@angular/material/list'


@Component({
  selector: 'app-votantes',
  templateUrl: './votantes.component.html',
  styleUrls: ['./votantes.component.css']
})
export class VotantesComponent implements OnInit {

  public nombre;
  public id;
  public tipo;
  disableSelect = new FormControl(true);
  votantes: string[] = [];
  votantesEliminar = []

  constructor(private servicioVotaciones: VotacionesService) { }

  ngOnInit(): void {
    this.votantes = [];
    this.votantes = this.servicioVotaciones.votantes;
  }

  agregarVotante(){
    this.servicioVotaciones.agregarVotante(this.nombre, this.id, this.tipo)
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
      var id = this.votantesEliminar[i].identificador;
      console.log("Id a eliminar> " + id)
      this.servicioVotaciones.eliminarVotante(id);
    }

  }

}
