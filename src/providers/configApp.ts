import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Diagnostic } from '@ionic-native/diagnostic';

// This for HttP
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
//

@Injectable()
export class ConfigApp {
  CONFIGURE = 'config'

  constructor(
	  public http: Http,
	  public storage: Storage,
    private diagnostic: Diagnostic
  )
  {
    this.start()
  }
  start(){
    this.storage.ready().then(_=>{
      console.log("Storage Ready")
      this.setConfig()

      let successCallback = (isAvailable) => {
        console.log('Is available? ' + isAvailable);
        this.getConfig()
        .then(data => {
          console.log(">>>>SASDFASDF",data.config_APP.nfc)
          if(isAvailable == true){
            data.config_APP.nfc = true
            data.config_APP.qr = false
            this.storage.set(this.CONFIGURE, data)
          }else{
            data.config_APP.nfc = false
            data.config_APP.qr = true
            this.storage.set(this.CONFIGURE, data)
          }
        })
      };
      let errorCallback = (e) => console.error(e);
      this.diagnostic.isNFCPresent().then(successCallback, errorCallback);

    })
  }



  setConfig(): void {
    console.log(">>>setConfig")
    // this.http.get('../assets/data/config.json') // This is for browser
		this.http.get('assets/data/config.json')
    .map(res => res.json())
    .subscribe(data =>{
      this.storage.set(this.CONFIGURE, data)
    });
  }

  updateConfig(data) {
    this.getConfig()
    .then(dataConf => {
      dataConf.config_APP = data
      this.storage.set(this.CONFIGURE, dataConf)
    })
  }

  getConfig(): Promise<any> {
    return this.storage.get(this.CONFIGURE).then(data => {
      return data
    })
  }

  clearConfig(): void {
    this.storage.remove(this.CONFIGURE)
    this.setConfig()
  }

}
