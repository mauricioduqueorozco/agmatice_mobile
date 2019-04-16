import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { StartPage } from '../../pages/start/start';
import { ConfigApp } from '../../providers/configApp';
import { UserData } from '../../providers/userData';


@Component({
  selector: 'page-config',
  templateUrl: 'config.html'
})

export class ConfigPage {
  history : String = "";
  config : any = {}
  password_root = ""

  constructor(
    public navCtrl: NavController,
    public alertCtrl : AlertController,
    public configApp : ConfigApp,
    public userData : UserData
  )
  {
      this.start()
  }
  start(){
    this.configApp.getConfig()
    .then(data => {
      this.config = data.config_APP
      this.password_root = data.passwords.root
    })
  }

  setSetting(data){
    let data_Config = data

    this.configApp.getConfig()
    .then(data => {
      if(data.config_APP.nfc == true && data_Config.qr == true) {
        this.notify("Error", "No se pueden seleccionar QR y NFC al mismo tiempo")
      }
      else {
        this.configApp.updateConfig(data_Config)
      }
    })

    // this.configApp.updateConfig(data)
    console.log("DATA COnf", data)
  }

  eraseData(){
    let prompt = this.alertCtrl.create({
      title: 'Advertencia',
      message: "Se borrará todos los datos almacenados en el telefono, tendrá que iniciar de nuevo con internet",
      inputs: [
        {
          name: 'Password',
          placeholder: 'Contraseña'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            // console.log('Cancel clicked');
          }
        },
        {
          text: 'Borrar',
          handler: data => {
            // console.log(data)
            if(data.Password == this.password_root){
              this.configApp.clearConfig()
              this.userData.clearUser()
              this.userData.clearUserActive()
              this.userData.clearDataLost()

              this.notify("Exito", "Toda la información fue borrada con exito")
              this.navCtrl.push(StartPage)
              .catch((err: any) => {
                console.log(`Didn't set nav root: ${err}`);
              });
            }else{
              this.notify("Error", "No concuerda la clave de borrado")
            }
          }
        }
      ]
    });
    prompt.present();
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
