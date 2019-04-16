import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { HomePage } from '../pages/home/home';
import { StartPage } from '../pages/start/start';

//providers
import { ConfigApp } from '../providers/configApp';
// import { AuthPage } from '../pages/auth/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage: any;
  // rootPage:any = HomePage;
  // rootPage:any = AuthPage;


  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public configApp : ConfigApp,
    public storage: Storage
  )
  {
    this.start()
  }
  start(){

    this.storage.get('hasSetup')
    .then((hasSetup) => {
      if(hasSetup) this.rootPage = HomePage;
      else this.rootPage = StartPage;
    })


    this.platformReady();
  }

  platformReady(){
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

}
