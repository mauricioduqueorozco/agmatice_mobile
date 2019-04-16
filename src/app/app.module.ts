import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Geolocation } from '@ionic-native/geolocation';
import { File } from '@ionic-native/file';
import { Network } from '@ionic-native/network';
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';
import { NFC, Ndef } from '@ionic-native/nfc';
import { Diagnostic } from '@ionic-native/diagnostic';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
// import { TestPage } from '../pages/test/test';
import { AuthPage } from '../pages/auth/auth';
import { ConfigPage } from '../pages/config/config';
import { SyncPage } from '../pages/sync/sync';
import { WorkPage } from '../pages/workpage/workpage';
import { StartPage } from '../pages/start/start';

// providers

import { Internet } from '../providers/internet';
import { UserData } from '../providers/userData';
import { ConfigApp } from '../providers/configApp';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    // TestPage,
    AuthPage,
    ConfigPage,
    SyncPage,
    WorkPage,
    StartPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    // TestPage,
    AuthPage,
    ConfigPage,
    SyncPage,
    WorkPage,
    StartPage
  ],
  providers: [
    StatusBar,
    Internet,
    UserData,
    ConfigApp,
    SplashScreen,
    BarcodeScanner,
    Geolocation,
    File,
    Network,
    NFC,
    Ndef,
    Diagnostic,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
