import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { VotacionesService } from 'src/servicios/votaciones.service';
import { Router } from '@angular/router';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Votaciones } from '../interfaces/votaciones';
import { wsServices } from 'src/servicios/ws-service';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog-service';
import { ToastService } from '../_services/toast.service';

@Component({
  selector: 'app-historial-votaciones',
  templateUrl: './historial-votaciones.component.html',
  styleUrls: ['./historial-votaciones.component.css']
})
export class HistorialVotacionesComponent implements OnInit {

  listaVotaciones: MatTableDataSource<Votaciones>;
  displayedColumns: string[] = ['tipo', 'codigoConsejo', 'descripcion', 'estado', 'configurar', 'eliminar'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) matPaginator: MatPaginator;
  searchKey: String;
  tipo: String;
  estado: String;

  constructor(public toastService: ToastService,private confirmationDialogService: ConfirmationDialogService,private servicioVotaciones: VotacionesService, private router: Router, private _wsService: wsServices) {}

  ngOnInit(): void {
    const callback = this.cargarVotaciones.bind(this);
    this.servicioVotaciones.getVotingHistoryAPI(callback);
  }

  cargarVotaciones(){
    this.listaVotaciones = new MatTableDataSource<Votaciones>(this.servicioVotaciones.votaciones)
    this.listaVotaciones.sort = this.sort;
    this.listaVotaciones.paginator = this.matPaginator;
  }

  crearVotacion(){
    this.router.navigate(["main-menu/crear-votacion"])
  }

  eliminarVotacion(id){
    console.log("ID ENVIADO: "+ id)
    this.cargarLista()
    let detalleVotacion = this.servicioVotaciones.getDetalleVotacion(id);
    this.servicioVotaciones.eliminarVotacion(id)
    console.log("-------------------------------------")
    console.log(detalleVotacion)
    console.log("-------------------------------------")
    this._wsService.eliminarVotacion(detalleVotacion.codigoAcceso, detalleVotacion.codigoConsejo).subscribe(
      result => {
        this.showSuccess()
        console.log(result)
      ,error => {
        this.showError()
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

  public openConfirmationDialog(id) {
    this.confirmationDialogService.confirm('Por favor confirma', `¿Quieres eliminar la votación?`)
    .then((confirmed) => {
      if(confirmed === true){
        this.eliminarVotacion(id)
      }
    })
    .catch(() => 
      console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  showSuccess() {
    this.toastService.show(`Votación eliminada correctamente.!`, {
      classname: 'bg-success text-light',
      delay: 5000 ,
      autohide: true,
      headertext: 'Eliminar Votación'
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
