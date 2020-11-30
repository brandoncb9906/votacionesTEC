import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { mainModule } from 'process';
import { AboutComponent } from './about/about.component';
import { CrearVotacionComponent } from './crear-votacion/crear-votacion.component';
import { HistorialVotacionesDetalleComponent } from './historial-votaciones-detalle/historial-votaciones-detalle.component';
import { HistorialVotacionesComponent } from './historial-votaciones/historial-votaciones.component';
import { LoginComponent } from './login/login.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { VotantesComponent } from './votantes/votantes.component';

const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path:'main-menu', component: MainMenuComponent, children: [
    {path:'historial-votaciones', component: HistorialVotacionesComponent},
    {path:'historial-votaciones/:id', component: HistorialVotacionesDetalleComponent},
    {path:'crear-votacion', component: CrearVotacionComponent},
    {path:'votantes', component: VotantesComponent},
    {path:'about', component: AboutComponent}
  ]},
  {path: '**', pathMatch: 'full', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginComponent, MainMenuComponent]