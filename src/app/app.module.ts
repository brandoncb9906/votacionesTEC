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

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    CrearVotacionComponent,
    AboutComponent,
    HistorialVotacionesComponent,
    VerVotacionesComponent,
    HistorialVotacionesDetalleComponent,
    VotantesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
