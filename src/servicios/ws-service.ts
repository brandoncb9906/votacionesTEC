import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
const axios = require('axios');

@Injectable({
  providedIn: 'root'
})

export class wsServices {

url = "https://immense-savannah-25898.herokuapp.com";

constructor(private http: HttpClient) {}

  loginWS(req: any): Observable<any> {
    return this.http.post(`${this.url}/api/loginAdmin`, req);
  }

  getVotingHistory(){
    return this.http.get(`${this.url}/api/getVoting`);
  }

  agregarVotante(req: any){
    return this.http.post(`${this.url}/api/insertVoter`, req);
  }

  getProfessors(){
    return this.http.get(`${this.url}/api/getProfessors`);
  }
  
  crearVotacion(description, whoProposed, accesCode, councilCode, voteType, voteDate, voters) {
    const config = {
      description: description,
      whoProposed: whoProposed,
      accessCode: accesCode,
      councilCode: councilCode,
      voteType: voteType, // 0 privada 1 publica    
      voteDate: voteDate, 
      voters: voters
    }
    console.log(config)
    return this.http.post(`${this.url}/api/createVote`, config);
  }

  modificarVotacion(codigoAcceso, codigoConcejo, descripcion, nombrePropuso, nuevoCodigoAcceso, nuevoCodigoConcejo){
    const config = {
      "accessCode": codigoAcceso, 
      "councilCode": codigoConcejo,
      "description": descripcion,
      "whoProposed": nombrePropuso,
      "newAccessCode": nuevoCodigoAcceso,
      "newCouncilCode": nuevoCodigoConcejo
  }
    return this.http.post(`${this.url}/api/UpdateVote`, config)
  }

  eliminarVotacion(codigoAcceso, codigoConsejo){
    const config = {
      accessCode: codigoAcceso,
      councilCode: codigoConsejo
    }
    return this.http.post(`${this.url}/api/deleteVote`, config)
  }

  iniciarVotacion(codigoAcceso, codigoConcejo){
    const config = {
      "accessCode": codigoAcceso,
      "councilCode": codigoConcejo
    }
    console.log(config)
    return this.http.post(`${this.url}/api/allowVote`, config)  
  }

  cerrarVotacion(codigoAcceso, codigoConsejo){
    const config = {
      "accessCode": codigoAcceso,
      "councilCode": codigoConsejo
    }
    return this.http.post(`${this.url}/api/closeVote`, config)  
  }
}