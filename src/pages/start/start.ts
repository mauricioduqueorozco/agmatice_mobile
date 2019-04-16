import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { Storage } from '@ionic/storage';

// This for HttP
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
//

import { UserData } from '../../providers/userData';

import { AlertController } from 'ionic-angular';
import { AuthPage } from '../../pages/auth/auth';

@Component({
  selector: 'page-start',
  templateUrl: 'start.html'
})

export class StartPage {
  login = { company: ''};

  constructor(
    public navCtrl: NavController,
    public http: Http,
    private alertCtrl: AlertController,
    public userData : UserData,
    public storage: Storage
  )
  {}
  requestCompany(form: NgForm){
    // this.userData.setUser()
    console.log(">>>>Companys" , this.login.company)
    if(form.valid){
      // if(this.login.company == "agmatice"){

        this.userData.getCompany()
        .then(data => {
            console.log(">>>>COMPANY", data)
            if(this.login.company == data){
              console.log("Entrasasdas")
              this.gotoPage("data")
            }else{
              console.log("No Entrasasdas")
              // this.gotoPage(null)

              this.userData.updateUser(this.login.company)

            }
        })

        // this.userData.getUser()
        // .then(data => {
        //   if(data) this.validateInfo(data)
        //   else this.notify("Error", 'No se puede acceder a la información')
        // })
    }else{
      this.notify("Error", "Se necesitan los datos de empresa")
    }
  }

  gotoPage(data){
    if(data){
      this.notify("Exito", 'Usuarios cargados con exito')
      this.openPage()
    }else{
      this.notify("Error", 'Usuarios no cargados')
    }
  }

  openPage() {
      this.navCtrl.push(AuthPage)
      .then(()=>{
        this.storage.set('hasSetup', 'true');
      })
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
