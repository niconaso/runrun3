import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { LocalStorage, Storage } from 'ionic-angular';

import {AuthHttp, JwtHelper, tokenNotExpired} from 'angular2-jwt';

/*
  Generated class for the AuthService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/


@Injectable()
export class AuthService {
  ENDPOINT: string = 'http://192.168.150.40:8080/runrun3backend/api/users/login';

  jwtHelper: JwtHelper = new JwtHelper();
  local: Storage = new Storage(LocalStorage);

  // We need to set the content type for the server
  contentHeader: Headers = new Headers({ "Content-Type": "application/json" });


  constructor(private http: Http) {
    this.http = http;
  }

  login(username: String, password: String) {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.ENDPOINT, JSON.stringify({ username: username, password: password }), { headers: this.contentHeader })
        .map(res => res.json())
        .subscribe(
        data => {

          //TODO: mejorar el storage
          window.localStorage.setItem('id_token', data.tokenJWT);
          window.localStorage.setItem('runrun-3-user', JSON.stringify(data.userDTO));

          resolve(data.userDTO);
        },
        err => {
          reject(err);
        });
    });
  }

  logout() {
    window.localStorage.clear();
  }

  isAuthenticated() {
    return window.localStorage.getItem('id_token');
  }

  public static authenticated() {
    return tokenNotExpired();
  }
}
