import {Component} from '@angular/core';
import {NavController, NavParams, ModalController} from 'ionic-angular';
import {TimeAgoPipe} from 'angular2-moment/TimeAgoPipe';

import {PostDetailPage} from '../post-detail/post-detail';
import {NewPostPage} from '../new-post/new-post';
import {NotificationsPage} from '../notifications/notifications'


@Component({
  templateUrl: 'build/pages/the-aisle/the-aisle.html',
  pipes: [TimeAgoPipe]
})
export class TheAislePage {
  posts: Array<{ body: string, likes: number, comments: number, createdAt: Date }> = [];

  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {
    this.initializeItems();
  }

  randomString(length, chars) {
    var mask = '';
    if (chars.indexOf('a') > -1) mask += 'abcdefghijklmnopqrstuvwxyz';
    if (chars.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (chars.indexOf('#') > -1) mask += '0123456789';
    if (chars.indexOf('!') > -1) mask += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\';
    var result = '';
    for (var i = length; i > 0; --i) result += mask[Math.floor(Math.random() * mask.length)];
    return result;
  }

  randomNumber(length) {
    return Math.floor(Math.random() * length + 1);
  }

  initializeItems() {
    for (let i = 1; i < 200; i++) {
      this.posts.push({
        body: this.randomString(this.randomNumber(200), '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
        likes: this.randomNumber(50),
        comments: this.randomNumber(50),
        createdAt: new Date()
      });
    }
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.posts = this.posts.filter((post) => {
        return (post.body.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  newPost() {
    let modal = this.modalCtrl.create(NewPostPage);
    modal.present();
  }

  showComments(event, post) {
    this.navCtrl.push(PostDetailPage, {
      post: post
    });
  }

  showNotifications() {
    this.navCtrl.push(NotificationsPage);
  }
}
