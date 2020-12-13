import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VotacionesService } from 'src/servicios/votaciones.service';
import { wsServices } from 'src/servicios/ws-service';
import { ToastService } from '../_services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  public user;
  public errorMsg;

  constructor(public toastService: ToastService,
    private router: Router, 
    private wsServices: wsServices, private servicioVotaciones: VotacionesService) { 
    this.user = {
      username: '',
      password: ''
    };
    //this.wsServices = wsServices;
  }

  ngOnInit(): void {
    this.user.username = 'admin';
    this.user.password = 'admin';
  }

  logIn(){
    this.wsServices.loginWS(this.user).subscribe(
      data => {
        console.log("Login Data: " + JSON.stringify(data))
        if(data.access === true && data.msg === 0){
          console.log("Acceso Correcto")
          this.showSuccess()
          this.router.navigate(["main-menu/historial-votaciones"])
        }
        if(data.msg === 1 || data.msg === 2){
          this.showError()
          this.errorMsg = "Usuario o contraseña incorrecta, intente de nuevo" 
          console.log(this.errorMsg)
        }
      },
      error => {
        console.log('Error en la consulta');
      }
    );
  }

  showSuccess() {
    this.toastService.show(`Bienvenido ${this.user.username}`, {
      classname: 'bg-success text-light',
      delay: 5000 ,
      autohide: true,
      headertext: 'LOGIN'
    });
  }

  showError() {
    this.toastService.show('Usuario o contraseña incorrecta, intente de nuevo', {
      classname: 'bg-danger text-light',
      delay: 5000 ,
      autohide: true,
      headertext: 'Error!!!'
    });
  }
  
}
