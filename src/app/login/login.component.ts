import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { wsServices } from 'src/servicios/ws-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  public user;

  constructor(private router: Router, 
    private wsServices: wsServices) { 
    this.user = {
      email: '',
      password: ''
    };
    //this.wsServices = wsServices;
  }

  ngOnInit(): void {
    this.user.email = 'brandon@gmail.com';
    this.user.password = '123456';
  }

  logIn(){
    this.wsServices.loginWS(this.user).subscribe(
      data => {
        console.log("DATA>> " + JSON.stringify(data))
        console.log("DATA>> " + data.message)
        if(data.message == "login success"){
          this.router.navigate(["main-menu/historial-votaciones"])
        }else{
          //Mensaje de datos erroneos
        }
      },
      error => {
        console.log('Error en la consulta');
      }
    );
  }
  
}
