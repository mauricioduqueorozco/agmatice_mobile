import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController, LoadingController } from 'ionic-angular';

// This for HttP
import 'rxjs/add/operator/map';
import { Http, Headers, RequestOptions } from '@angular/http';
//

// import { HomePage } from '../../pages/home/home';

import { Geolocation } from '@ionic-native/geolocation';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { NFC } from '@ionic-native/nfc';

import { Internet } from '../../providers/internet';
import { ConfigApp } from '../../providers/configApp';
import { UserData } from '../../providers/userData';

@Component({
  selector : 'page-workpage',
  templateUrl : 'workpage.html'
})

export class WorkPage {
  appButton : any;
  user : any = "";
  options : BarcodeScannerOptions ;
	flag : boolean = false;

  constructor(
    public navCtrl : NavController,
		private navParams : NavParams,
    private configApp : ConfigApp,
    private userData : UserData,
    public internet : Internet,
    public toastCtrl: ToastController,
    public alertCtrl : AlertController,
    public loadingCtrl : LoadingController,
    private geolocation: Geolocation,
    public http: Http,
    private barcode: BarcodeScanner,
    private nfc: NFC
  )
  {
		this.start(this.navParams.data)
		console.log("Flag",this.flag)
  }

  start(data){
    this.appButton = data

    this.userData.getUserActive()
    .then(data =>{
      if (data) this.user = data
    })

    this.configApp.getConfig()
    .then(data => {
      console.log(">>>>Config" , data)
      if(data.config_APP.mode == false) this.presentToast()
		})

  }

  selectedData(data){
    let data_selection = data
    this.configApp.getConfig()
    .then(data => {
      if(data.config_APP.qr == true) this.barcodeScanner(data_selection)
      if(data.config_APP.nfc == true) this.nfcDecoder(data_selection)
    })
  }

  async barcodeScanner(data){
    let data_value = data

    this.options = { prompt : 'Leer código' }
    this.barcode.scan(this.options)
    .then(data => {
      if(data.text) {
				let data_id = JSON.parse(data.text);
				if(data_id.id) data_id = data_id.id
        this.sendOrSave({id: data_id, value : data_value})
      }
    },(err) =>{
      console.log("Error")
    })

  }

  nfcDecoder(data){
		let loading = this.loadingCtrl.create({
			content: `<div class="custom-spinner-container">Por favor leer tag <div class="custom-spinner-box"></div></div>`
		})

		loading.present()

		let data_value = data


		this.nfc.addTagDiscoveredListener(data => {
			//console.log(">>>> Listener", data)
	 	}, err => {
			//console.log(">>>> NFC Error", err)
	 	})
		.subscribe((event) => {
			if(this.flag == false){
				let tag = this.nfc.bytesToHexString(event.tag.id)
				console.log(">>DECODE", tag)
				loading.dismiss()
				this.sendOrSave({id: this.nfc.bytesToHexString(event.tag.id), value : data_value })
			}
			this.flag = true
		})

  }

  sendOrSave(data){
    // CAllback hell TODO Mejorar este callback
    let data_scan = data

    this.configApp.getConfig()
    .then(data_configuration => {

      this.userData.getUserActive()
      .then(data_user =>{
        let coord = ""

        if(data_configuration.config_APP.gps == true) {
          this.getCoords()
          .then(data => {
            coord = data
          })
        }else{
          coord = null
        }

        let data_send = {
          user : data_user,
          mode : data_configuration.config_APP.mode,
          scan : data_scan,
          date : (new Date()).toISOString(),
          coords : coord
        }

        if(this.internet.detectConnection() == true)this.sendData(data_send)
        else this.saveData(data_send)

      })

    })

  }

  sendData(data){

    this.configApp.getConfig()
    .then(data_urls => {

      if(data_urls){

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

    		this.http.post(data_urls.urls.sendData, data, options)
        .map(res => res.json())
        .subscribe(data =>{
    			this.notify("Exito", "Información enviada con exito")
    			// this.navCtrl.push(HomePage)
        }, err => {
    			//this.notify("Error", "No se puedo completar la operación, pero se guarda la información")
          this.saveData(data)
        });
      }else{
        this.notify("Error", "No hay URL configurada")
      }
		})
  }

	saveData(data){
    console.log("saveData", data)

    this.userData.saveDataLost(data)
    this.notify("Exito", 'Se guardó la información en memoria')
		// this.navCtrl.push(HomePage)
  }

  getCoords(): Promise<any> {
    return this.geolocation.getCurrentPosition({timeout: 3000, maximumAge: 30000, enableHighAccuracy : true})
    .then((data) => {
      return ([data.coords.longitude , data.coords.latitude])
    })
    .catch(err =>
      console.log(">>Err ", err)
    )
  }

  presentToast() {
    const toast = this.toastCtrl.create({
       message: 'Usted esta en modo ENTRENAMIENTO',
       showCloseButton: true,
       closeButtonText: 'Ok'
     });
     toast.present();
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
