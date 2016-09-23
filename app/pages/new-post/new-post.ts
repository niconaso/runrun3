import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import {Camera} from 'ionic-native';


/*
  Generated class for the NewPostPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/new-post/new-post.html'
})
export class NewPostPage {
   public base64Image: string;

  constructor(public viewCtrl: ViewController) {

  }

  takePicture(){
    Camera.getPicture({
        destinationType: Camera.DestinationType.DATA_URL,
        targetWidth: 1000,
        targetHeight: 1000
    }).then((imageData) => {
      // imageData is a base64 encoded string
        this.base64Image = "data:image/jpeg;base64," + imageData;
    }, (err) => {
        console.log(err);
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
