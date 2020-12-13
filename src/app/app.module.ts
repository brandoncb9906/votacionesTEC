import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { CrearVotacionComponent } from './crear-votacion/crear-votacion.component';
import { AboutComponent } from './about/about.component';
import { HistorialVotacionesComponent } from './historial-votaciones/historial-votaciones.component';
import { VerVotacionesComponent } from './ver-votaciones/ver-votaciones.component';
import { HistorialVotacionesDetalleComponent } from './historial-votaciones-detalle/historial-votaciones-detalle.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { VotantesComponent } from './votantes/votantes.component';
import { MaterialModule } from './material/material.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastComponent } from './toast/toast.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogService } from './confirmation-dialog/confirmation-dialog-service';
import { SocketIoModule } from 'ngx-socket-io'
import { CookieService } from 'ngx-cookie-service'
import { WebSocketService } from '../servicios/WebSocket/web-socket.service'

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    CrearVotacionComponent,
    AboutComponent,
    HistorialVotacionesComponent,
    VerVotacionesComponent,
    HistorialVotacionesDetalleComponent,
    VotantesComponent,
    ToastComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    NgbModule,
    SocketIoModule
  ],
  providers: [ConfirmationDialogService, CookieService, WebSocketService],
  entryComponents: [ ConfirmationDialogComponent ],
  bootstrap: [AppComponent]
})
export class AppModule { }
