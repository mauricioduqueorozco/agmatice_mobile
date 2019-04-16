import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Network } from '@ionic-native/network';

@Injectable()
export class Internet {
  INTERNET_VERIFIER : boolean = true;

  constructor(public network : Network){
    this.detectConnection()
  }

  detectConnection() {
    this.network.onConnect()
    .subscribe(data => {
      if(data.type == "online") this.INTERNET_VERIFIER = true

    }, error => console.log(error))
    this.network.onDisconnect()
    .subscribe(data => {
      if(data.type == "offline") this.INTERNET_VERIFIER = false

    }, error => console.log(error))

    return this.INTERNET_VERIFIER
  }
}
