import {Component, ViewChild} from '@angular/core';
import {ionicBootstrap, Platform, MenuController, Nav} from 'ionic-angular';
import {StatusBar, Splashscreen, Keyboard} from 'ionic-native';
import {AuthHttp, AuthConfig} from 'angular2-jwt';
import * as moment from 'moment';
import 'moment/min/locales.min';

import {AuthService} from './providers/auth-service/auth-service';

import {LoginPage} from './pages/login/login';
import {ConfigurationPage} from './pages/configuration/configuration';
import {TheAislePage} from './pages/the-aisle/the-aisle';
import {MyProfilePage} from './pages/my-profile/my-profile';

@Component({
  templateUrl: 'build/app.html',
  providers: [AuthService]
})
class RunRunApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage: any = LoginPage;
  pages: Array<{ title: string, component: any, icon: string }>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    private auth: AuthService

  ) {
    // Moment Locale
    moment.locale('es');


    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Pasillo', component: TheAislePage, icon: 'megaphone' },
      { title: 'Configuración', component: ConfigurationPage, icon: 'cog' }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      //StatusBar.backgroundColorByHexString('#00D3BC');
      //StatusBar.backgroundColorByHexString('#06ad9b');

      this.checkAuthorized();
      this.hideSplashScreen();
    });
  }

  checkAuthorized() {
    if (this.auth.isAuthenticated()) {
      this.rootPage = TheAislePage;
    } else {
      this.rootPage = LoginPage;
    }
  }

  hideSplashScreen() {
    if (Splashscreen) {
      setTimeout(() => {
        Splashscreen.hide();
      }, 100);
    }
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }

  goToProfile() {
    this.openPage({ component: MyProfilePage });
  }

  logout() {
    this.menu.close();
    this.auth.logout();
    this.nav.setRoot(LoginPage);
  }
}

// bootstrap app
ionicBootstrap(RunRunApp, [], {
  backButtonText: ''
});
