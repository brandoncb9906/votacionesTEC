import { Injectable } from '@angular/core';
import io from 'socket.io-client'
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class WebSocketService {
  private url = 'http://localhost:3000';

  constructor() {
  }

  public connectToServer(config: any) {
    var socket = io.connect(this.url, { 'forceNew': true });
    this.sendData(socket, config);
    return socket;
  }

  public sendData(config, socket: any) {
    socket.emit('read-vote', config);
  }

  public getVote(config, socket: any){
    socket.on('get-vote', config)
  }
}
