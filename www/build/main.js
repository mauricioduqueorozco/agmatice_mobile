webpackJsonp([0],{

/***/ 107:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_auth_auth__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_config_config__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_sync_sync__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_workpage_workpage__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_userData__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_configApp__ = __webpack_require__(32);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


// import { TestPage } from '../../pages/test/test';




// import { StartPage } from '../../pages/start/start';


var HomePage = (function () {
    function HomePage(navCtrl, alertCtrl, configApp, userData) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.configApp = configApp;
        this.userData = userData;
        this.password_root = "";
        // sync : boolean = false;
        this.appPages = [
            { title: 'Autorización', name: __WEBPACK_IMPORTED_MODULE_2__pages_auth_auth__["a" /* AuthPage */], component: __WEBPACK_IMPORTED_MODULE_2__pages_auth_auth__["a" /* AuthPage */], parameters: [], icon: 'key', enable: false },
            { title: 'Configuraciones', name: __WEBPACK_IMPORTED_MODULE_3__pages_config_config__["a" /* ConfigPage */], component: __WEBPACK_IMPORTED_MODULE_3__pages_config_config__["a" /* ConfigPage */], parameters: [], icon: 'cog', enable: true },
            { title: 'Sincronización', name: __WEBPACK_IMPORTED_MODULE_4__pages_sync_sync__["a" /* SyncPage */], component: __WEBPACK_IMPORTED_MODULE_4__pages_sync_sync__["a" /* SyncPage */], parameters: [], icon: 'sync', enable: true },
        ];
        this.profile = {};
        this.init();
        this.addPagesWork();
    }
    HomePage.prototype.addPagesWork = function () {
        var _this = this;
        this.userData.getUser()
            .then(function (data) {
            console.log(data);
            if (data.hasOwnProperty("process")) {
                for (var key in data.process) {
                    if (_this.profile.role == key) {
                        _this.appPages.push({ title: key, name: __WEBPACK_IMPORTED_MODULE_5__pages_workpage_workpage__["a" /* WorkPage */], component: __WEBPACK_IMPORTED_MODULE_5__pages_workpage_workpage__["a" /* WorkPage */], parameters: data.process[key], icon: 'map', enable: true });
                    }
                }
            }
        });
    };
    HomePage.prototype.init = function () {
        var _this = this;
        this.configApp.getConfig()
            .then(function (data) {
            _this.password_root = data.passwords.root;
        });
        this.userData.getUserActive()
            .then(function (data) {
            // console.log(data)
            if (data)
                _this.profile = data;
            else {
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__pages_auth_auth__["a" /* AuthPage */])
                    .catch(function (err) {
                    console.log("Didn't set nav root: " + err);
                });
            }
        });
    };
    HomePage.prototype.openPage = function (page) {
        var _this = this;
        // console.log(page.name.name)
        var params = {};
        if (!page.parameters)
            params = {};
        else
            params = page.parameters;
        if (page.name.name == 'ConfigPage') {
            var prompt_1 = this.alertCtrl.create({
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
                        handler: function (data) {
                            // console.log('Cancel clicked');
                        }
                    },
                    {
                        text: 'Entrar',
                        handler: function (data) {
                            console.log(data);
                            if (data.Password == _this.password_root) {
                                _this.notify("Accesso", "Acceso correcto");
                                _this.navCtrl.push(page.name, params)
                                    .catch(function (err) {
                                    console.log("Didn't set nav root: " + err);
                                });
                            }
                            else {
                                _this.notify("Error", "No concuerda la clave");
                            }
                        }
                    }
                ]
            });
            prompt_1.present();
        }
        else {
            this.navCtrl.push(page.name, params)
                .catch(function (err) {
                console.log("Didn't set nav root: " + err);
            });
        }
    };
    HomePage.prototype.endWork = function () {
        this.userData.clearUserActive();
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__pages_auth_auth__["a" /* AuthPage */])
            .catch(function (err) {
            console.log("Didn't set nav root: " + err);
        });
    };
    HomePage.prototype.notify = function (title, message) {
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: message,
            buttons: ['Ok']
        });
        alert.present();
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/mauricio/Documents/agmatice_mobile/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Agmatice Control\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <p>\n    Nombre operador: {{profile.name}}\n  </p>\n  <p>\n    Identificación: {{profile.cedula}}\n  </p>\n  <p>\n    Perfil: {{profile.role}}\n  </p>\n\n  <p>\n  </p>\n  <ion-list>\n    <ion-list-header>\n      Navegación\n    </ion-list-header>\n    <button ion-item menuClose *ngFor="let p of appPages" (click)="openPage(p)" [disabled]="!p.enable">\n      <ion-icon item-start [name]="p.icon"></ion-icon>\n      {{p.title}}\n    </button>\n  </ion-list>\n\n  <p>\n  </p>\n  <button  ion-button full (click)="endWork()">Finalizar trabajo</button>\n</ion-content>\n'/*ion-inline-end:"/Users/mauricio/Documents/agmatice_mobile/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_7__providers_configApp__["a" /* ConfigApp */],
            __WEBPACK_IMPORTED_MODULE_6__providers_userData__["a" /* UserData */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 108:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_home_home__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_start_start__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_userData__ = __webpack_require__(31);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


// import { UserOptions } from '../../interfaces/user-options';



// This for HttP
// import 'rxjs/add/operator/map';
// import { Http, Headers, RequestOptions } from '@angular/http';
//
var AuthPage = (function () {
    function AuthPage(navCtrl, 
        // public http: Http,
        alertCtrl, userData) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.userData = userData;
        this.login = { password: '' };
    }
    AuthPage.prototype.onLogin = function (form) {
        var _this = this;
        // console.log("entra")
        if (form.valid) {
            this.userData.getUser()
                .then(function (data) {
                // console.log(data)
                if (data)
                    _this.validateLogin(data);
                else
                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__pages_start_start__["a" /* StartPage */]);
            });
        }
        else {
            this.notify("Error", "Se necesitan los datos de usuario");
        }
    };
    // TODO
    AuthPage.prototype.validateLogin = function (data) {
        this.userData.clearUserActive();
        for (var i in data.users) {
            // console.log(data.users[i].cedula, this.login.password)
            if (data.users[i].cedula == this.login.password) {
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__pages_home_home__["a" /* HomePage */]);
                this.userData.setUserActive(data.users[i]);
                break;
            }
        }
    };
    AuthPage.prototype.notify = function (title, message) {
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: message,
            buttons: ['Ok']
        });
        alert.present();
    };
    AuthPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-auth',template:/*ion-inline-start:"/Users/mauricio/Documents/agmatice_mobile/src/pages/auth/auth.html"*/'<ion-header>\n  <ion-navbar hideBackButton *navbar>\n    <ion-title>\n      Autenticación\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <form #loginForm="ngForm" novalidate>\n    <ion-list no-lines>\n\n      <ion-item>\n        <ion-label stacked color="primary">Contraseña</ion-label>\n        <ion-input [(ngModel)]="login.password" name="password" type="password" #password="ngModel" required>\n        </ion-input>\n      </ion-item>\n      <p ion-text [hidden]="password.valid || submitted == false" color="danger" padding-left>\n        Se requiere la contraseña\n      </p>\n    </ion-list>\n\n    <ion-row responsive-sm>\n      <ion-col>\n        <button ion-button (click)="onLogin(loginForm)" type="submit" block>Iniciar sesión</button>\n      </ion-col>\n    </ion-row>\n  </form>\n\n</ion-content>\n'/*ion-inline-end:"/Users/mauricio/Documents/agmatice_mobile/src/pages/auth/auth.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_4__providers_userData__["a" /* UserData */]])
    ], AuthPage);
    return AuthPage;
}());

//# sourceMappingURL=auth.js.map

/***/ }),

/***/ 109:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Internet; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_network__ = __webpack_require__(207);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var Internet = (function () {
    function Internet(network) {
        this.network = network;
        this.INTERNET_VERIFIER = true;
        this.detectConnection();
    }
    Internet.prototype.detectConnection = function () {
        var _this = this;
        this.network.onConnect()
            .subscribe(function (data) {
            if (data.type == "online")
                _this.INTERNET_VERIFIER = true;
        }, function (error) { return console.log(error); });
        this.network.onDisconnect()
            .subscribe(function (data) {
            if (data.type == "offline")
                _this.INTERNET_VERIFIER = false;
        }, function (error) { return console.log(error); });
        return this.INTERNET_VERIFIER;
    };
    Internet = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__ionic_native_network__["a" /* Network */]])
    ], Internet);
    return Internet;
}());

//# sourceMappingURL=internet.js.map

/***/ }),

/***/ 120:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 120;

/***/ }),

/***/ 162:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 162;

/***/ }),

/***/ 210:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConfigPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_start_start__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_configApp__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_userData__ = __webpack_require__(31);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ConfigPage = (function () {
    function ConfigPage(navCtrl, alertCtrl, configApp, userData) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.configApp = configApp;
        this.userData = userData;
        this.history = "";
        this.config = {};
        this.password_root = "";
        this.start();
    }
    ConfigPage.prototype.start = function () {
        var _this = this;
        this.configApp.getConfig()
            .then(function (data) {
            _this.config = data.config_APP;
            _this.password_root = data.passwords.root;
        });
    };
    ConfigPage.prototype.setSetting = function (data) {
        var _this = this;
        var data_Config = data;
        this.configApp.getConfig()
            .then(function (data) {
            if (data.config_APP.nfc == true && data_Config.qr == true) {
                _this.notify("Error", "No se pueden seleccionar QR y NFC al mismo tiempo");
            }
            else {
                _this.configApp.updateConfig(data_Config);
            }
        });
        // this.configApp.updateConfig(data)
        console.log("DATA COnf", data);
    };
    ConfigPage.prototype.eraseData = function () {
        var _this = this;
        var prompt = this.alertCtrl.create({
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
                    handler: function (data) {
                        // console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Borrar',
                    handler: function (data) {
                        // console.log(data)
                        if (data.Password == _this.password_root) {
                            _this.configApp.clearConfig();
                            _this.userData.clearUser();
                            _this.userData.clearUserActive();
                            _this.userData.clearDataLost();
                            _this.notify("Exito", "Toda la información fue borrada con exito");
                            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__pages_start_start__["a" /* StartPage */])
                                .catch(function (err) {
                                console.log("Didn't set nav root: " + err);
                            });
                        }
                        else {
                            _this.notify("Error", "No concuerda la clave de borrado");
                        }
                    }
                }
            ]
        });
        prompt.present();
    };
    ConfigPage.prototype.notify = function (title, message) {
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: message,
            buttons: ['Ok']
        });
        alert.present();
    };
    ConfigPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-config',template:/*ion-inline-start:"/Users/mauricio/Documents/agmatice_mobile/src/pages/config/config.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Configuraciones\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-list no-lines>\n    <ion-item>\n      <ion-label>Producción</ion-label>\n      <ion-toggle [(ngModel)]="config.mode" #mode="ngModel" name="mode"  (ionChange)="setSetting(config)"></ion-toggle>\n    </ion-item>\n    <ion-item>\n      <ion-label>NFC</ion-label>\n      <ion-toggle [(ngModel)]="config.nfc" #nfc="ngModel" name="nfc"  (ionChange)="setSetting(config)"></ion-toggle>\n    </ion-item>\n    <ion-item>\n      <ion-label>QR</ion-label>\n      <ion-toggle [(ngModel)]="config.qr" #qr="ngModel" name="qr"  (ionChange)="setSetting(config)"></ion-toggle>\n    </ion-item>\n    <ion-item>\n      <ion-label>GPS</ion-label>\n      <ion-toggle [(ngModel)]="config.gps" #gps="ngModel" name="gps"  (ionChange)="setSetting(config)"></ion-toggle>\n    </ion-item>\n    <ion-item>\n      <button  ion-button full (click)="eraseData()">Reset</button>\n    </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/mauricio/Documents/agmatice_mobile/src/pages/config/config.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_configApp__["a" /* ConfigApp */],
            __WEBPACK_IMPORTED_MODULE_4__providers_userData__["a" /* UserData */]])
    ], ConfigPage);
    return ConfigPage;
}());

//# sourceMappingURL=config.js.map

/***/ }),

/***/ 211:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SyncPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_internet__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_userData__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_configApp__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_http__ = __webpack_require__(35);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





// This for HttP


//
var SyncPage = (function () {
    function SyncPage(navCtrl, internet, alertCtrl, userData, configApp, http) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.internet = internet;
        this.alertCtrl = alertCtrl;
        this.userData = userData;
        this.configApp = configApp;
        this.http = http;
        this.history = "";
        this.url = "http://192.168.100.20:8000/monitoring/test";
        this.sync = false;
        this.configApp.getConfig()
            .then(function (data) {
            if (data.urls.sendData)
                _this.url = data.urls.sendData;
        });
        this.userData.getDataLost()
            .then(function (data) {
            console.log(data);
            if (data) {
                _this.sync = true;
                _this.history = "Notificar y enviar jornada de trabajo";
            }
            else {
                _this.history = "No hay data para sincronizar";
            }
        });
    }
    SyncPage.prototype.sincronizarData = function () {
        var _this = this;
        if (this.internet.detectConnection() == true) {
            this.userData.getDataLost()
                .then(function (data) {
                if (data)
                    _this.sendData(data);
            });
        }
        else {
            this.notify("Alerta", "No hay conexión a internet");
        }
    };
    SyncPage.prototype.sendData = function (data) {
        var _this = this;
        this.configApp.getConfig()
            .then(function (data_urls) {
            if (data_urls) {
                var headers = new __WEBPACK_IMPORTED_MODULE_6__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
                var options = new __WEBPACK_IMPORTED_MODULE_6__angular_http__["d" /* RequestOptions */]({ headers: headers });
                _this.http.post(data_urls.urls.sendData, data, options)
                    .map(function (res) { return res.json(); })
                    .subscribe(function (data) {
                    _this.userData.clearDataLost();
                    _this.history = "No hay data para sincronizar";
                    _this.sync = false;
                    _this.notify("Exito", "Información enviada con exito");
                }, function (err) {
                    // console.log(">>>> Data Response" , err.status);
                    _this.notify("Error", "No se puedo completar la operación");
                });
            }
            else {
                _this.notify("Error", "No hay URL configurada");
            }
        });
    };
    SyncPage.prototype.notify = function (title, message) {
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: message,
            buttons: ['Ok']
        });
        alert.present();
    };
    SyncPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-sync',template:/*ion-inline-start:"/Users/mauricio/Documents/agmatice_mobile/src/pages/sync/sync.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n    Información pendiente de enviar\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-label>{{history}}</ion-label>\n  <button  ion-button full [disabled]="!sync" (click)="sincronizarData()" >Sincronización</button>\n</ion-content>\n'/*ion-inline-end:"/Users/mauricio/Documents/agmatice_mobile/src/pages/sync/sync.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_internet__["a" /* Internet */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_userData__["a" /* UserData */],
            __WEBPACK_IMPORTED_MODULE_4__providers_configApp__["a" /* ConfigApp */],
            __WEBPACK_IMPORTED_MODULE_6__angular_http__["b" /* Http */]])
    ], SyncPage);
    return SyncPage;
}());

//# sourceMappingURL=sync.js.map

/***/ }),

/***/ 212:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WorkPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_geolocation__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_barcode_scanner__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_nfc__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_internet__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_configApp__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_userData__ = __webpack_require__(31);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};


// This for HttP


//
// import { HomePage } from '../../pages/home/home';






var WorkPage = (function () {
    function WorkPage(navCtrl, navParams, configApp, userData, internet, toastCtrl, alertCtrl, loadingCtrl, geolocation, http, barcode, nfc) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.configApp = configApp;
        this.userData = userData;
        this.internet = internet;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.geolocation = geolocation;
        this.http = http;
        this.barcode = barcode;
        this.nfc = nfc;
        this.user = "";
        this.flag = false;
        this.start(this.navParams.data);
        console.log("Flag", this.flag);
    }
    WorkPage.prototype.start = function (data) {
        var _this = this;
        this.appButton = data;
        this.userData.getUserActive()
            .then(function (data) {
            if (data)
                _this.user = data;
        });
        this.configApp.getConfig()
            .then(function (data) {
            console.log(">>>>Config", data);
            if (data.config_APP.mode == false)
                _this.presentToast();
        });
    };
    WorkPage.prototype.selectedData = function (data) {
        var _this = this;
        var data_selection = data;
        this.configApp.getConfig()
            .then(function (data) {
            if (data.config_APP.qr == true)
                _this.barcodeScanner(data_selection);
            if (data.config_APP.nfc == true)
                _this.nfcDecoder(data_selection);
        });
    };
    WorkPage.prototype.barcodeScanner = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var data_value;
            return __generator(this, function (_a) {
                data_value = data;
                this.options = { prompt: 'Leer código' };
                this.barcode.scan(this.options)
                    .then(function (data) {
                    if (data.text) {
                        var data_id = JSON.parse(data.text);
                        if (data_id.id)
                            data_id = data_id.id;
                        _this.sendOrSave({ id: data_id, value: data_value });
                    }
                }, function (err) {
                    console.log("Error");
                });
                return [2 /*return*/];
            });
        });
    };
    WorkPage.prototype.nfcDecoder = function (data) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: "<div class=\"custom-spinner-container\">Por favor leer tag <div class=\"custom-spinner-box\"></div></div>"
        });
        loading.present();
        var data_value = data;
        this.nfc.addTagDiscoveredListener(function (data) {
            //console.log(">>>> Listener", data)
        }, function (err) {
            //console.log(">>>> NFC Error", err)
        })
            .subscribe(function (event) {
            if (_this.flag == false) {
                var tag = _this.nfc.bytesToHexString(event.tag.id);
                console.log(">>DECODE", tag);
                loading.dismiss();
                _this.sendOrSave({ id: _this.nfc.bytesToHexString(event.tag.id), value: data_value });
            }
            _this.flag = true;
        });
    };
    WorkPage.prototype.sendOrSave = function (data) {
        var _this = this;
        // CAllback hell TODO Mejorar este callback
        var data_scan = data;
        this.configApp.getConfig()
            .then(function (data_configuration) {
            _this.userData.getUserActive()
                .then(function (data_user) {
                var coord = "";
                if (data_configuration.config_APP.gps == true) {
                    _this.getCoords()
                        .then(function (data) {
                        coord = data;
                    });
                }
                else {
                    coord = null;
                }
                var data_send = {
                    user: data_user,
                    mode: data_configuration.config_APP.mode,
                    scan: data_scan,
                    date: (new Date()).toISOString(),
                    coords: coord
                };
                if (_this.internet.detectConnection() == true)
                    _this.sendData(data_send);
                else
                    _this.saveData(data_send);
            });
        });
    };
    WorkPage.prototype.sendData = function (data) {
        var _this = this;
        this.configApp.getConfig()
            .then(function (data_urls) {
            if (data_urls) {
                var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
                var options = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["d" /* RequestOptions */]({ headers: headers });
                _this.http.post(data_urls.urls.sendData, data, options)
                    .map(function (res) { return res.json(); })
                    .subscribe(function (data) {
                    _this.notify("Exito", "Información enviada con exito");
                    // this.navCtrl.push(HomePage)
                }, function (err) {
                    //this.notify("Error", "No se puedo completar la operación, pero se guarda la información")
                    _this.saveData(data);
                });
            }
            else {
                _this.notify("Error", "No hay URL configurada");
            }
        });
    };
    WorkPage.prototype.saveData = function (data) {
        console.log("saveData", data);
        this.userData.saveDataLost(data);
        this.notify("Exito", 'Se guardó la información en memoria');
        // this.navCtrl.push(HomePage)
    };
    WorkPage.prototype.getCoords = function () {
        return this.geolocation.getCurrentPosition({ timeout: 3000, maximumAge: 30000, enableHighAccuracy: true })
            .then(function (data) {
            return ([data.coords.longitude, data.coords.latitude]);
        })
            .catch(function (err) {
            return console.log(">>Err ", err);
        });
    };
    WorkPage.prototype.presentToast = function () {
        var toast = this.toastCtrl.create({
            message: 'Usted esta en modo ENTRENAMIENTO',
            showCloseButton: true,
            closeButtonText: 'Ok'
        });
        toast.present();
    };
    WorkPage.prototype.notify = function (title, message) {
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: message,
            buttons: ['Ok']
        });
        alert.present();
    };
    WorkPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-workpage',template:/*ion-inline-start:"/Users/mauricio/Documents/agmatice_mobile/src/pages/workpage/workpage.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Labor\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n    Usuario {{user.name}}\n    <ion-list>\n     <!-- <ion-item *ngFor="let item of appButton">\n        <ion-label class="custom-agmatice">{{item}}</ion-label>\n        <ion-checkbox [(ngModel)]="item.checked" (click)="selectedData(item)"></ion-checkbox>\n		 </ion-item> -->\n			<ion-list-header>Elegir una opción</ion-list-header>\n			<button class="custom-agmatice-button" ion-button full *ngFor="let item of appButton; let i = index" data-index="i"  (click)="selectedData(item)">\n				<ion-label class="custom-agmatice">{{ i + 1 }}. {{ item }}</ion-label>\n			</button>\n    </ion-list>\n\n    <p></p>\n    <!-- <button ion-button (click)="scannerData()" block>Enviar</button> -->\n\n</ion-content>\n'/*ion-inline-end:"/Users/mauricio/Documents/agmatice_mobile/src/pages/workpage/workpage.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_8__providers_configApp__["a" /* ConfigApp */],
            __WEBPACK_IMPORTED_MODULE_9__providers_userData__["a" /* UserData */],
            __WEBPACK_IMPORTED_MODULE_7__providers_internet__["a" /* Internet */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Http */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_barcode_scanner__["a" /* BarcodeScanner */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_nfc__["a" /* NFC */]])
    ], WorkPage);
    return WorkPage;
}());

//# sourceMappingURL=workpage.js.map

/***/ }),

/***/ 213:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(236);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 236:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_barcode_scanner__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_geolocation__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_file__ = __webpack_require__(286);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_network__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_storage__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_http__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_nfc__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_diagnostic__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__app_component__ = __webpack_require__(291);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_home_home__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_auth_auth__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_config_config__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_sync_sync__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_workpage_workpage__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_start_start__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__providers_internet__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__providers_userData__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__providers_configApp__ = __webpack_require__(32);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};















// import { TestPage } from '../pages/test/test';





// providers



var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_13__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_14__pages_home_home__["a" /* HomePage */],
                // TestPage,
                __WEBPACK_IMPORTED_MODULE_15__pages_auth_auth__["a" /* AuthPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_config_config__["a" /* ConfigPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_sync_sync__["a" /* SyncPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_workpage_workpage__["a" /* WorkPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_start_start__["a" /* StartPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_10__angular_http__["c" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_13__app_component__["a" /* MyApp */], {}, {
                    links: []
                }),
                __WEBPACK_IMPORTED_MODULE_9__ionic_storage__["a" /* IonicStorageModule */].forRoot()
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_13__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_14__pages_home_home__["a" /* HomePage */],
                // TestPage,
                __WEBPACK_IMPORTED_MODULE_15__pages_auth_auth__["a" /* AuthPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_config_config__["a" /* ConfigPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_sync_sync__["a" /* SyncPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_workpage_workpage__["a" /* WorkPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_start_start__["a" /* StartPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_20__providers_internet__["a" /* Internet */],
                __WEBPACK_IMPORTED_MODULE_21__providers_userData__["a" /* UserData */],
                __WEBPACK_IMPORTED_MODULE_22__providers_configApp__["a" /* ConfigApp */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_barcode_scanner__["a" /* BarcodeScanner */],
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_geolocation__["a" /* Geolocation */],
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_file__["a" /* File */],
                __WEBPACK_IMPORTED_MODULE_8__ionic_native_network__["a" /* Network */],
                __WEBPACK_IMPORTED_MODULE_11__ionic_native_nfc__["a" /* NFC */],
                __WEBPACK_IMPORTED_MODULE_11__ionic_native_nfc__["b" /* Ndef */],
                __WEBPACK_IMPORTED_MODULE_12__ionic_native_diagnostic__["a" /* Diagnostic */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 291:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_home_home__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_start_start__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_configApp__ = __webpack_require__(32);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







//providers

// import { AuthPage } from '../pages/auth/auth';
var MyApp = (function () {
    // rootPage:any = HomePage;
    // rootPage:any = AuthPage;
    function MyApp(platform, statusBar, splashScreen, configApp, storage) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.configApp = configApp;
        this.storage = storage;
        this.start();
    }
    MyApp.prototype.start = function () {
        var _this = this;
        this.storage.get('hasSetup')
            .then(function (hasSetup) {
            if (hasSetup)
                _this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */];
            else
                _this.rootPage = __WEBPACK_IMPORTED_MODULE_6__pages_start_start__["a" /* StartPage */];
        });
        this.platformReady();
    };
    MyApp.prototype.platformReady = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/mauricio/Documents/agmatice_mobile/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/Users/mauricio/Documents/agmatice_mobile/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_7__providers_configApp__["a" /* ConfigApp */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 31:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserData; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_configApp__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(35);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



// This for HttP


//
var UserData = (function () {
    function UserData(http, configApp, storage) {
        var _this = this;
        this.http = http;
        this.configApp = configApp;
        this.storage = storage;
        this.USER_DATA = 'users';
        this.USER_ACTIVE = 'userActive';
        this.USER_DATA_LOST = 'dataLost';
        this.storage.ready().then(function (_) {
            console.log("Storage Ready");
            _this.setUser(null);
        });
    }
    //  DATA of Company
    UserData.prototype.setUser = function (url) {
        var _this = this;
        var url_toRequest = url || 'assets/data/data.json';
        console.log("USUDUADSDAS", url_toRequest);
        // this.http.get('../assets/data/data.json') // this is for browser
        // this.http.get('assets/data/data.json')
        this.http.get(url_toRequest)
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            console.log(">>>>>DATALOAD", data);
            _this.storage.set(_this.USER_DATA, data);
        });
    };
    UserData.prototype.updateUser = function (data) {
        var _this = this;
        this.configApp.getConfig()
            .then(function (data_urls) {
            console.log(">>URLS<", data_urls.urls.loginCompany + data);
            _this.setUser(data_urls.urls.loginCompany + data);
            // this.http.get(data_urls.urls.loginCompany + data).map(res => res.json()).subscribe(data =>{
            //   console.log(">>>>>DATALOAD", data)
            //
            //   this.storage.set(this.USER_DATA, data)
            //
            // }, err => {
            //   console.log(">>>>>err", err)
            // });
        });
    };
    UserData.prototype.getUser = function () {
        return this.storage.get(this.USER_DATA).then(function (data) {
            return data;
        });
    };
    UserData.prototype.getCompany = function () {
        return this.storage.get(this.USER_DATA).then(function (data) {
            return data.company;
        });
    };
    UserData.prototype.clearUser = function () {
        this.storage.remove(this.USER_DATA);
        this.setUser(null);
    };
    // Data of user from company
    UserData.prototype.setUserActive = function (data) {
        this.storage.set(this.USER_ACTIVE, data);
    };
    UserData.prototype.getUserActive = function () {
        return this.storage.get(this.USER_ACTIVE).then(function (data) {
            return data;
        });
    };
    UserData.prototype.clearUserActive = function () {
        this.storage.remove(this.USER_ACTIVE);
    };
    // Data lost from company and users
    UserData.prototype.saveDataLost = function (data) {
        var _this = this;
        var dataSave = data;
        this.getDataLost()
            .then(function (data) {
            console.log(">>>DataSave: ", data);
            if (data) {
                data.push(dataSave);
                _this.storage.set(_this.USER_DATA_LOST, data);
            }
            else {
                _this.storage.set(_this.USER_DATA_LOST, [dataSave]);
            }
        });
    };
    UserData.prototype.getDataLost = function () {
        return this.storage.get(this.USER_DATA_LOST).then(function (data) {
            return data;
        });
    };
    UserData.prototype.clearDataLost = function () {
        this.storage.remove(this.USER_DATA_LOST);
    };
    UserData = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__angular_http__["b" /* Http */],
            __WEBPACK_IMPORTED_MODULE_2__providers_configApp__["a" /* ConfigApp */],
            __WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */]])
    ], UserData);
    return UserData;
}());

//# sourceMappingURL=userData.js.map

/***/ }),

/***/ 32:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConfigApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_diagnostic__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(35);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



// This for HttP


//
var ConfigApp = (function () {
    function ConfigApp(http, storage, diagnostic) {
        this.http = http;
        this.storage = storage;
        this.diagnostic = diagnostic;
        this.CONFIGURE = 'config';
        this.start();
    }
    ConfigApp.prototype.start = function () {
        var _this = this;
        this.storage.ready().then(function (_) {
            console.log("Storage Ready");
            _this.setConfig();
            var successCallback = function (isAvailable) {
                console.log('Is available? ' + isAvailable);
                _this.getConfig()
                    .then(function (data) {
                    console.log(">>>>SASDFASDF", data.config_APP.nfc);
                    if (isAvailable == true) {
                        data.config_APP.nfc = true;
                        data.config_APP.qr = false;
                        _this.storage.set(_this.CONFIGURE, data);
                    }
                    else {
                        data.config_APP.nfc = false;
                        data.config_APP.qr = true;
                        _this.storage.set(_this.CONFIGURE, data);
                    }
                });
            };
            var errorCallback = function (e) { return console.error(e); };
            _this.diagnostic.isNFCPresent().then(successCallback, errorCallback);
        });
    };
    ConfigApp.prototype.setConfig = function () {
        var _this = this;
        console.log(">>>setConfig");
        // this.http.get('../assets/data/config.json') // This is for browser
        this.http.get('assets/data/config.json')
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            _this.storage.set(_this.CONFIGURE, data);
        });
    };
    ConfigApp.prototype.updateConfig = function (data) {
        var _this = this;
        this.getConfig()
            .then(function (dataConf) {
            dataConf.config_APP = data;
            _this.storage.set(_this.CONFIGURE, dataConf);
        });
    };
    ConfigApp.prototype.getConfig = function () {
        return this.storage.get(this.CONFIGURE).then(function (data) {
            return data;
        });
    };
    ConfigApp.prototype.clearConfig = function () {
        this.storage.remove(this.CONFIGURE);
        this.setConfig();
    };
    ConfigApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__angular_http__["b" /* Http */],
            __WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_diagnostic__["a" /* Diagnostic */]])
    ], ConfigApp);
    return ConfigApp;
}());

//# sourceMappingURL=configApp.js.map

/***/ }),

/***/ 56:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StartPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_userData__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_auth_auth__ = __webpack_require__(108);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



// This for HttP


//



var StartPage = (function () {
    function StartPage(navCtrl, http, alertCtrl, userData, storage) {
        this.navCtrl = navCtrl;
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.userData = userData;
        this.storage = storage;
        this.login = { company: '' };
    }
    StartPage.prototype.requestCompany = function (form) {
        var _this = this;
        // this.userData.setUser()
        console.log(">>>>Companys", this.login.company);
        if (form.valid) {
            // if(this.login.company == "agmatice"){
            this.userData.getCompany()
                .then(function (data) {
                console.log(">>>>COMPANY", data);
                if (_this.login.company == data) {
                    console.log("Entrasasdas");
                    _this.gotoPage("data");
                }
                else {
                    console.log("No Entrasasdas");
                    // this.gotoPage(null)
                    _this.userData.updateUser(_this.login.company);
                }
            });
            // this.userData.getUser()
            // .then(data => {
            //   if(data) this.validateInfo(data)
            //   else this.notify("Error", 'No se puede acceder a la información')
            // })
        }
        else {
            this.notify("Error", "Se necesitan los datos de empresa");
        }
    };
    StartPage.prototype.gotoPage = function (data) {
        if (data) {
            this.notify("Exito", 'Usuarios cargados con exito');
            this.openPage();
        }
        else {
            this.notify("Error", 'Usuarios no cargados');
        }
    };
    StartPage.prototype.openPage = function () {
        var _this = this;
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__pages_auth_auth__["a" /* AuthPage */])
            .then(function () {
            _this.storage.set('hasSetup', 'true');
        })
            .catch(function (err) {
            console.log("Didn't set nav root: " + err);
        });
    };
    StartPage.prototype.notify = function (title, message) {
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: message,
            buttons: ['Ok']
        });
        alert.present();
    };
    StartPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-start',template:/*ion-inline-start:"/Users/mauricio/Documents/agmatice_mobile/src/pages/start/start.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Configuración inicial\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <form #loginForm="ngForm" novalidate>\n    <ion-list no-lines>\n      <ion-item>\n        <ion-label stacked color="primary">Empresa</ion-label>\n        <ion-input [(ngModel)]="login.company" name="company" type="text" #company="ngModel" spellcheck="false" autocapitalize="off" required></ion-input>\n      </ion-item>\n      <p ion-text [hidden]="company.valid || submitted == false" color="danger" padding-left>\n        Se requiere la empresa\n      </p>\n\n    </ion-list>\n\n    <ion-row responsive-sm>\n      <ion-col>\n        <button ion-button full (click)="requestCompany(loginForm)" type="submit" block>Configurar</button>\n      </ion-col>\n    </ion-row>\n  </form>\n\n</ion-content>\n'/*ion-inline-end:"/Users/mauricio/Documents/agmatice_mobile/src/pages/start/start.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_4__angular_http__["b" /* Http */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_5__providers_userData__["a" /* UserData */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]])
    ], StartPage);
    return StartPage;
}());

//# sourceMappingURL=start.js.map

/***/ })

},[213]);
//# sourceMappingURL=main.js.map