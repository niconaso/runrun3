import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

/*
  Generated class for the NewPostPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/new-post/new-post.html',
})
export class NewPostPage {

  constructor(public viewCtrl: ViewController) {

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
