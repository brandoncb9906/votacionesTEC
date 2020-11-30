import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
const axios = require('axios');

@Injectable({
  providedIn: 'root'
})

export class wsServices {

url = "http://localhost:3000";

constructor(private http: HttpClient) {}

  loginWS(req: any): Observable<any> {
    const config = {
      req
    };
    return this.http.post(`${this.url}/user/login`, config);
  }

  crearVotacion(accesCode, adviceCode, descripcion, date, favor, against, abstain, nameProposedPoint, status, listvotantes, votacionType) {
    const config = {
      accesCode: accesCode,
      adviceCode:adviceCode,
      descripcion: descripcion,
      date: date,
      favor: favor,
      against: against,
      abstain: abstain,
      nameProposedPoint: nameProposedPoint,
      status: status, 
      listvotantes: listvotantes,
      votacionType: votacionType // 10 privada 20 publica
    }
    console.log(config)
    return this.http.post(`${this.url}/votacion/addVotacion`, config);
  }

  modificarVotacion(codigoAcceso, codigoConsejo, descripcion, nombrePropuso){
    const config = {
      accesCode: codigoAcceso,
      adviceCode: codigoConsejo,
      description: descripcion,
      nameProposedPoint: nombrePropuso
    }
    return this.http.post(`${this.url}/votacion/modifVotacion`, config)
  }

  eliminarVotacion(codigoAcceso, codigoConsejo){
    const config = {
      accesCode: codigoAcceso,
      adviceCode: codigoConsejo
    }
    return this.http.post(`${this.url}/votacion/deleteVotacion`, config)
  }

  iniciarVotacion(codigoAcceso, codigoConsejo){
    const config = {
      accesCode: codigoAcceso,
      adviceCode: codigoConsejo
    }
    return this.http.post(`${this.url}/votacion/openVotacion`, config)  
  }
}