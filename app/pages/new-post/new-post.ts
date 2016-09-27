import { Component } from '@angular/core';
import { ViewController, ActionSheetController } from 'ionic-angular';

import {Camera, ImagePicker, Keyboard} from 'ionic-native';

/*
  Generated class for the NewPostPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/new-post/new-post.html'
})
export class NewPostPage {
  public base64Images: Array<string> = [];

  private imagePickerOptions: Object = {
    // max images to be selected, defaults to 15. If this is set to 1, upon
    // selection of a single image, the plugin will return it.
    maximumImagesCount: 3
  };

  constructor(public viewCtrl: ViewController, public actionSheetCtrl: ActionSheetController) {
  }

  takePicture() {
    Camera.getPicture({
      destinationType: Camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000
    }).then((imageData) => {
      // imageData is a base64 encoded string
      let imageSrc = "data:image/jpeg;base64," + imageData;
      this.base64Images.push(imageSrc);
    }, (err) => {
      console.log(err);
    });
  }

  selectPictures() {
    ImagePicker.getPictures(this.imagePickerOptions).then((results) => {
      for (var i = 0; i < results.length; i++) {
        console.log('Image URI: ' + results[i]);
        this.base64Images.push(results[i]);
      }
    }, (err) => { });
  }

  presentActionSheet() {
    if(Keyboard){
      Keyboard.close();
    }

    let actionSheet = this.actionSheetCtrl.create({
      title: 'Adjuntar una imagen',
      buttons: [
        {
          text: 'Tomar una foto',
          handler: () => {
            this.takePicture();
          }
        },
        {
          text: 'Seleccionar de la galeria',
          handler: () => {
            this.selectPictures();
          }
        }, {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  focusInput(input) {
    input.setFocus();
  }
}
