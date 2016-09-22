import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { FormBuilder, ControlGroup, Validators } from '@angular/common';

import { AuthService } from '../../providers/auth-service/auth-service';
import {TheAislePage} from '../the-aisle/the-aisle';

/*
  Generated class for the LoginPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/login/login.html',
  providers: [AuthService]
})
export class LoginPage {
  loginForm: ControlGroup

  constructor(private navCtrl: NavController, private fb: FormBuilder, private auth: AuthService, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
    this.loginForm = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(data) {
    let loader = this.loadingCtrl.create({
      content: 'Iniciando sesión...'
    });
    loader.present();


    this.auth.login(data.username, data.password).then(
      user => {
        loader.dismiss();

        this.navCtrl.setRoot(TheAislePage);
      }).catch(err => {
        loader.dismiss();

        let alert = this.alertCtrl.create({
          title: 'Advertencia',
          subTitle: 'El usuario y/o contraseña es incorrecto!',
          buttons: ['OK']
        });
        alert.present();
      });
  }
}
