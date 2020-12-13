import { io } from 'socket.io-client'
import { Observable } from 'rxjs';

export class WebSocketService {
  private url = 'https://immense-savannah-25898.herokuapp.com';
  private socket; 

  constructor() {
    this.socket = io(this.url)
  }

  public sendVotacion(config) {
    this.socket.emit('read-vote', config);
}

  public getVote = () => {
    /*return Observable.create((observer) => {
        this.socket.on('read-vote', (message) => {
            observer.next(message);
        });
    });*/
}
}
