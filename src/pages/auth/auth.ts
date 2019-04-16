import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController, AlertController } from 'ionic-angular';

// import { UserOptions } from '../../interfaces/user-options';
import { HomePage } from '../../pages/home/home';
import { StartPage } from '../../pages/start/start';

import { UserData } from '../../providers/userData';
// This for HttP
// import 'rxjs/add/operator/map';
// import { Http, Headers, RequestOptions } from '@angular/http';
//

@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html'
})
export class AuthPage {

  login = { password: ''};

  constructor(
    public navCtrl: NavController,
    // public http: Http,
    public alertCtrl : AlertController,
    public userData : UserData
  ){}

  onLogin(form: NgForm){
    // console.log("entra")
    if(form.valid){
      this.userData.getUser()
      .then(data =>{
        // console.log(data)
        if(data) this.validateLogin(data)
        else this.navCtrl.push(StartPage)
      })
    }else{
      this.notify("Error", "Se necesitan los datos de usuario")
    }

  }
// TODO
  validateLogin(data){
    this.userData.clearUserActive()
    for( let i in data.users){
      // console.log(data.users[i].cedula, this.login.password)
      if(data.users[i].cedula == this.login.password){
        this.navCtrl.push(HomePage)
        this.userData.setUserActive(data.users[i])
        break;
      }
    }

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
