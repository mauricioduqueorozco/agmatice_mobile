import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { Internet } from '../../providers/internet';
import { UserData } from '../../providers/userData';
import { ConfigApp } from '../../providers/configApp';

// This for HttP
import 'rxjs/add/operator/map';
import { Http, Headers, RequestOptions } from '@angular/http';
//

@Component({
  selector: 'page-sync',
  templateUrl: 'sync.html'
})

export class SyncPage {
  history : string = "";
	url : string = "http://192.168.100.20:8000/monitoring/test";
  sync : boolean = false;

  constructor(
    public navCtrl: NavController,
    public internet : Internet,
    public alertCtrl : AlertController,
    private userData : UserData,
    private configApp : ConfigApp,
    public http: Http
  )
  {
    this.configApp.getConfig()
    .then(data => {
      if(data.urls.sendData) this.url = data.urls.sendData
    })

    this.userData.getDataLost()
    .then(data => {
      console.log(data)
      if(data) {
        this.sync = true;
        this.history = "Notificar y enviar jornada de trabajo"
      }else{
        this.history = "No hay data para sincronizar"
      }
    })

  }

  sincronizarData(){
    if(this.internet.detectConnection() == true){
      this.userData.getDataLost()
      .then(data => {
        if(data) this.sendData(data)
      })
    }else{
      this.notify("Alerta", "No hay conexión a internet")
    }
  }

  sendData(data): void{
    this.configApp.getConfig()
    .then(data_urls => {
      if(data_urls){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

    		this.http.post(data_urls.urls.sendData, data, options)
        .map(res => res.json())
        .subscribe(data =>{
          this.userData.clearDataLost()
          this.history = "No hay data para sincronizar"
          this.sync = false;
          this.notify("Exito", "Información enviada con exito")
        }, err => {
          // console.log(">>>> Data Response" , err.status);
          this.notify("Error", "No se puedo completar la operación")
        });
      }else{
        this.notify("Error", "No hay URL configurada")
      }
		})
  }

  notify(title, message){
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['Ok']
    });
    alert.present();
  }

}
