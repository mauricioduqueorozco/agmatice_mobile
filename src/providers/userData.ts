import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { ConfigApp } from '../providers/configApp';

// This for HttP
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
//

@Injectable()
export class UserData {
  USER_DATA = 'users'
  USER_ACTIVE = 'userActive'
  USER_DATA_LOST = 'dataLost'

  constructor(
    public http: Http,
    private configApp : ConfigApp,
    public storage: Storage
  )
  {
    this.storage.ready().then(_=>{
      console.log("Storage Ready")
      this.setUser(null)
    })
  }

//  DATA of Company
  setUser(url): void {
    const url_toRequest = url || 'assets/data/data.json'
    console.log("USUDUADSDAS" , url_toRequest)
    // this.http.get('../assets/data/data.json') // this is for browser
    // this.http.get('assets/data/data.json')
    this.http.get(url_toRequest)
    .map(res => res.json())
    .subscribe(data =>{
      console.log(">>>>>DATALOAD", data)
      this.storage.set(this.USER_DATA, data)
    });
  }

  updateUser(data: String){
    this.configApp.getConfig()
    .then(data_urls => {
      console.log(">>URLS<" , data_urls.urls.loginCompany + data)
      this.setUser(data_urls.urls.loginCompany + data)

      // this.http.get(data_urls.urls.loginCompany + data).map(res => res.json()).subscribe(data =>{
      //   console.log(">>>>>DATALOAD", data)
      //
      //   this.storage.set(this.USER_DATA, data)
      //
      // }, err => {
      //   console.log(">>>>>err", err)
      // });
    })
  }

  getUser(): Promise<any> {
    return this.storage.get(this.USER_DATA).then(data => {
      return data
    })
  }

  getCompany(): Promise <any> {
    return this.storage.get(this.USER_DATA).then(data => {
      return data.company
    })
  }

  clearUser(): void {
    this.storage.remove(this.USER_DATA)
    this.setUser(null)
  }

// Data of user from company

  setUserActive(data): void{
    this.storage.set(this.USER_ACTIVE, data)
  }

  getUserActive(): Promise<any> {
    return this.storage.get(this.USER_ACTIVE).then(data => {
      return data
    })
  }

  clearUserActive(): void {
    this.storage.remove(this.USER_ACTIVE)
  }

  // Data lost from company and users
  saveDataLost(data): void{
    let dataSave = data
    this.getDataLost()
    .then(data => {
      console.log(">>>DataSave: ", data)
      if(data){
        data.push(dataSave)
        this.storage.set(this.USER_DATA_LOST, data)
      }else{
        this.storage.set(this.USER_DATA_LOST, [dataSave])
      }
    })
  }

  getDataLost(): Promise<any> {
    return this.storage.get(this.USER_DATA_LOST).then(data => {
      return data
    })
  }

  clearDataLost(): void {
    this.storage.remove(this.USER_DATA_LOST)
  }


}
