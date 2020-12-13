import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VotacionesService } from 'src/servicios/votaciones.service';
import { Votaciones } from '../interfaces/votaciones';
import { Router } from '@angular/router';
import { wsServices } from 'src/servicios/ws-service';
import * as XLSX from 'xlsx'; 
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog-service';
import { ToastService } from '../_services/toast.service';
import { WebSocketService } from '../../servicios/WebSocket/web-socket.service'

@Component({
  selector: 'app-historial-votaciones-detalle',
  templateUrl: './historial-votaciones-detalle.component.html',
  styleUrls: ['./historial-votaciones-detalle.component.css']
})
export class HistorialVotacionesDetalleComponent implements OnInit {

  // Variables
  public detalleVotacion: Votaciones
  public estudianteId;
  public editando = 'no';
  public nuevoCodigoConcejo = "";
  public nuevoCodigoAcceso = "";
  public votacionesRealizadas = []
  // EXCEL DOCUMENT VARIABLES
  wb = XLSX.utils.book_new();
  fileName= 'ExcelSheet.xlsx'; 

  constructor(
    private webSocketService: WebSocketService,
    public toastService: ToastService,
    private confirmationDialogService: ConfirmationDialogService,
    private route: ActivatedRoute, 
    private servicioVotaciones: VotacionesService, 
    private router: Router, 
    private _wsService: wsServices) {
    this.detalleVotacion = {
      id: '',
      tipo: '',
      codigoAcceso: '',
      codigoConsejo: '',
      descripcion: '',
      nombrePropuso: '',
      date: '',
      favor: 0,
      encontra: 0,
      abstencion: 0,
      status: '', // 2 is Active, 0 is close, 1 is ready to open.
      votantes: [{nombre:1, identificador:2}]
    };
  }

  ngOnInit(): void {
    // Get the id of the note from the URL
    this.estudianteId = this.route.snapshot.paramMap.get('id');
    this.detalleVotacion = this.servicioVotaciones.getDetalleVotacion(this.estudianteId);
    
    //socket
    this.sendVotacion(); 
    /*this.webSocketService
      .getVote()
      .subscribe((voto: string) => {
        this.votacionesRealizadas.push(voto);
      });*/
  }

  sendVotacion() {
    const config = {
      accessCode: this.detalleVotacion.codigoAcceso,
      councilCode: this.detalleVotacion.codigoConsejo
    }
    this.webSocketService.sendVotacion(config);
  }

  cambiarEstado1(){
    this.editando = 'si'
  }
  cambiarEstado2(){
    this.editando = 'no'
  }

  modificarVotacion(){
    this._wsService.modificarVotacion(this.detalleVotacion.codigoAcceso, this.detalleVotacion.codigoConsejo, 
      this.detalleVotacion.descripcion, this.detalleVotacion.nombrePropuso, this.nuevoCodigoAcceso, this.nuevoCodigoConcejo).subscribe(result => {
        console.log(result)
        this.volverMenuPrincipal()
        this.showSuccessModif()
        ,
        error => {
          this.showError()
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
    this._wsService.iniciarVotacion(this.detalleVotacion.codigoAcceso, this.detalleVotacion.codigoConsejo).subscribe(result => {
      console.log(result)
      this.showSuccessStart()
      this.detalleVotacion.status = '2'
      ,error => {
        this.showError()
        console.log(error)
      }
    });
  }

  cerrarVotacion(){
    this._wsService.cerrarVotacion(this.detalleVotacion.codigoAcceso.toString(), this.detalleVotacion.codigoConsejo.toString()).subscribe(result => {
      console.log(result)
      this.showSuccessClose()
      this.detalleVotacion.status = '0'
      ,error => {
        this.showError()
        console.log(error)
      }
    });
  }

  volverMenuPrincipal(){
    this.router.navigate(["main-menu/historial-votaciones"])
  }

  exportarExcel(): void {
       /* table id is passed over here */   
       let element = document.getElementById('excel-table'); 
       const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

       /* generate workbook and add the worksheet */
       const wb: XLSX.WorkBook = XLSX.utils.book_new();
       XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

       /* save to file */
       XLSX.writeFile(wb, this.fileName);
			
  }

  public openConfirmationDialog() {
    this.confirmationDialogService.confirm('Por favor confirma', `¿Quieres iniciar la votación?`)
    .then((confirmed) => {
      if(confirmed === true){
        this.iniciarVotacion()
      }
    })
    .catch(() => 
      console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  public openConfirmationDialog2() {
    this.confirmationDialogService.confirm('Por favor confirma', `¿Quieres cerrar la votación?`)
    .then((confirmed) => {
      if(confirmed === true){
        this.cerrarVotacion()
      }
    })
    .catch(() => 
      console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  public openConfirmationDialog3() {
    this.confirmationDialogService.confirm('Por favor confirma', `¿Quieres modificar la votación?`)
    .then((confirmed) => {
      if(confirmed === true){
        this.modificarVotacion()
      }
    })
    .catch(() => 
      console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  showSuccessStart() {
    this.toastService.show(`Votación Iniciada.!`, {
      classname: 'bg-success text-light',
      delay: 5000 ,
      autohide: true,
      headertext: 'Estado'
    });
  }

  showSuccessClose() {
    this.toastService.show(`Votación Cerrada.!`, {
      classname: 'bg-success text-light',
      delay: 5000 ,
      autohide: true,
      headertext: 'Estado'
    });
  }

  showSuccessModif() {
    this.toastService.show(`Se ha modificado correctamente.!`, {
      classname: 'bg-success text-light',
      delay: 5000 ,
      autohide: true,
      headertext: 'Datos'
    });
  }

  showError() {
    this.toastService.show('A ocurrido un error, por favor intente nuevamente!', {
      classname: 'bg-danger text-light',
      delay: 5000 ,
      autohide: true,
      headertext: 'Error!!!'
    });
  }
}
