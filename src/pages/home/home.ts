import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

// import { TestPage } from '../../pages/test/test';
import { AuthPage } from '../../pages/auth/auth';
import { ConfigPage } from '../../pages/config/config';
import { SyncPage } from '../../pages/sync/sync';
import { WorkPage } from '../../pages/workpage/workpage';
// import { StartPage } from '../../pages/start/start';

import { UserData } from '../../providers/userData';
import { ConfigApp } from '../../providers/configApp';

export interface PageInterface {
  title : string;
  name: any;
  component: any;
  parameters : any;
  icon: string;
  enable : any;
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  password_root = ""
  // sync : boolean = false;

  appPages: PageInterface[] = [
    { title: 'Autorización', name: AuthPage, component: AuthPage, parameters: [], icon: 'key', enable : false},
    { title: 'Configuraciones', name: ConfigPage, component: ConfigPage, parameters: [], icon: 'cog', enable : true },
    { title: 'Sincronización', name: SyncPage, component: SyncPage, parameters: [], icon: 'sync', enable : true },
    // { title: 'Inicio', name: StartPage, component: StartPage, parameters: [], icon: 'home' },
  ];

  profile : any = {};

  constructor(
    public navCtrl: NavController,
    public alertCtrl : AlertController,
    public configApp : ConfigApp,
    public userData : UserData
  )
  {
    this.init()
    this.addPagesWork()
  }

  addPagesWork(){
    this.userData.getUser()
    .then(data => {
      console.log(data)
      if(data.hasOwnProperty("process")){
        for(let key in data.process){
          if(this.profile.role == key){
            this.appPages.push(
              { title: key, name: WorkPage, component: WorkPage, parameters : data.process[key], icon: 'map', enable : true }
            )
          }
        }
      }
    })
  }

  init(){

    this.configApp.getConfig()
    .then(data => {
      this.password_root = data.passwords.root
    })

    this.userData.getUserActive()
    .then(data => {
      // console.log(data)
      if(data) this.profile = data;
      else{
        this.navCtrl.push(AuthPage)
        .catch((err: any) => {
          console.log(`Didn't set nav root: ${err}`);
        });
      }
    })
  }

  openPage(page: PageInterface) {
    // console.log(page.name.name)
    let params = {}
    if(!page.parameters) params = {}
    else params = page.parameters
    if(page.name.name == 'ConfigPage'){

      let prompt = this.alertCtrl.create({
        title: 'Advertencia',
        message: "Solo para administradores",
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
            text: 'Entrar',
            handler: data => {
              console.log(data)
              if(data.Password == this.password_root){

                this.notify("Accesso", "Acceso correcto")
                this.navCtrl.push(page.name, params)
                .catch((err: any) => {
                  console.log(`Didn't set nav root: ${err}`);
                });

              }else{
                this.notify("Error", "No concuerda la clave")
              }
            }
          }
        ]
      });
      prompt.present();

    }else{
      this.navCtrl.push(page.name, params)
      .catch((err: any) => {
        console.log(`Didn't set nav root: ${err}`);
      });

    }
  }

  endWork(){
    this.userData.clearUserActive()
    this.navCtrl.push(AuthPage)
    .catch((err: any) => {
      console.log(`Didn't set nav root: ${err}`);
    });
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
