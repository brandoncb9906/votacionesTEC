import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { VotacionesService } from 'src/servicios/votaciones.service';
import { Router } from '@angular/router';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Votaciones } from '../interfaces/votaciones';
import { wsServices } from 'src/servicios/ws-service';

@Component({
  selector: 'app-historial-votaciones',
  templateUrl: './historial-votaciones.component.html',
  styleUrls: ['./historial-votaciones.component.css']
})
export class HistorialVotacionesComponent implements AfterViewInit {

  listaVotaciones: MatTableDataSource<Votaciones>;
  displayedColumns: string[] = ['tipo', 'codigoConsejo', 'descripcion', 'estado', 'configurar', 'eliminar'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) matPaginator: MatPaginator;
  searchKey: String;
  
  constructor(private servicioVotaciones: VotacionesService, private router: Router, private _wsService: wsServices) {}

  ngAfterViewInit() {
    /*this.servicioVotaciones.votaciones.push(
      {id:'1', tipo: '10', codigoAcceso: '123', codigoConsejo: '123', descripcion: 'Hola',nombrePropuso: 'A', nombreVotante: 'B', date: '2020-09-11', favor: 0, encontra: 0, abstencion: 0, status: 'Pausada', votantes: []},
      {id:'2', tipo: '10', codigoAcceso: '123', codigoConsejo: '123', descripcion: 'Hola',nombrePropuso: 'A', nombreVotante: 'B', date: '2020-09-11', favor: 0, encontra: 0, abstencion: 0, status: 'Abierta', votantes: []},
      {id:'3', tipo: '10', codigoAcceso: '123', codigoConsejo: '123', descripcion: 'Hola',nombrePropuso: 'A', nombreVotante: 'B', date: '2020-09-11', favor: 0, encontra: 0, abstencion: 0, status: 'Cerrada', votantes: []},
      {id:'4', tipo: '10', codigoAcceso: '123', codigoConsejo: '123', descripcion: 'Hola',nombrePropuso: 'A', nombreVotante: 'B', date: '2020-09-11', favor: 0, encontra: 0, abstencion: 0, status: 'Abierta', votantes: []},
      {id:'5', tipo: '10', codigoAcceso: '123', codigoConsejo: '123', descripcion: 'Hola',nombrePropuso: 'A', nombreVotante: 'B', date: '2020-09-11', favor: 0, encontra: 0, abstencion: 0, status: 'Pausada', votantes: []},
      {id:'6', tipo: '10', codigoAcceso: '123', codigoConsejo: '123', descripcion: 'Hola',nombrePropuso: 'A', nombreVotante: 'B', date: '2020-09-11', favor: 0, encontra: 0, abstencion: 0, status: 'Abierta', votantes: []},
      {id:'7', tipo: '10', codigoAcceso: '123', codigoConsejo: '123', descripcion: 'Hola',nombrePropuso: 'A', nombreVotante: 'B', date: '2020-09-11', favor: 0, encontra: 0, abstencion: 0, status: 'Pausada', votantes: []},
      {id:'8', tipo: '10', codigoAcceso: '123', codigoConsejo: '123', descripcion: 'Hola',nombrePropuso: 'A', nombreVotante: 'B', date: '2020-09-11', favor: 0, encontra: 0, abstencion: 0, status: 'Abierta', votantes: []},
      {id:'9', tipo: '10', codigoAcceso: '123', codigoConsejo: '123', descripcion: 'Hola',nombrePropuso: 'A', nombreVotante: 'B', date: '2020-09-11', favor: 0, encontra: 0, abstencion: 0, status: 'Cerrada', votantes: []},
      {id:'1', tipo: '10', codigoAcceso: '123', codigoConsejo: '123', descripcion: 'Hola',nombrePropuso: 'A', nombreVotante: 'B', date: '2020-09-11', favor: 0, encontra: 0, abstencion: 0, status: 'Cerrada', votantes: []},
      {id:'2', tipo: '10', codigoAcceso: '123', codigoConsejo: '123', descripcion: 'Hola',nombrePropuso: 'A', nombreVotante: 'B', date: '2020-09-11', favor: 0, encontra: 0, abstencion: 0, status: 'Cerrada', votantes: []}
      )*/

    this.listaVotaciones = new MatTableDataSource<Votaciones>(this.servicioVotaciones.votaciones)
    this.listaVotaciones.sort = this.sort;
    this.listaVotaciones.paginator = this.matPaginator;
  }

  crearVotacion(){
    this.router.navigate(["main-menu/crear-votacion"])
  }

  eliminarVotacion(id){
    console.log("ID ENVIADO: "+ id)
    this.servicioVotaciones.eliminarVotacion(id)
    this.cargarLista()
    let detalleVotacion = this.servicioVotaciones.getDetalleVotacion(id);
    this._wsService.eliminarVotacion(detalleVotacion.codigoAcceso, detalleVotacion.codigoConsejo).subscribe(result => {
      console.log(result)
      
      ,error => {
        console.log(error)
      }
    })
  }

  cargarLista(){
    this.listaVotaciones = new MatTableDataSource<any>([])
    this.listaVotaciones = new MatTableDataSource<Votaciones>(this.servicioVotaciones.votaciones)
  }
  
  onSearchClear(){
    this.searchKey = ''
    this.applyFilter()
  }

  applyFilter(){
    this.listaVotaciones.filter = this.searchKey.trim().toLowerCase();
  }
}
