import {Component} from '@angular/core';
import { Control } from '@angular/common';
import {NavController, NavParams, ModalController} from 'ionic-angular';
import {TimeAgoPipe} from 'angular2-moment/TimeAgoPipe';

import { Post } from '../../providers/post/post';
import 'rxjs/add/operator/debounceTime';

import {PostDetailPage} from '../post-detail/post-detail';
import {NewPostPage} from '../new-post/new-post';
import {NotificationsPage} from '../notifications/notifications'


@Component({
  templateUrl: 'build/pages/the-aisle/the-aisle.html',
  pipes: [TimeAgoPipe],
  providers: [Post]
})
export class TheAislePage {
  searchTerm: string = '';
  searchControl: Control;
  searching: any = false;
  posts: any;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, private postService: Post) {
    //this.initializeItems();

    this.searchControl = new Control();
  }

  ionViewLoaded() {
    this.setFilteredItems();

    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
      this.searching = false;
      this.setFilteredItems();
    });
  }

  onSearchInput() {
    this.searching = true;
  }

  setFilteredItems() {
    this.posts = this.postService.filterItems(this.searchTerm);
  }

  newPost() {
    let modal = this.modalCtrl.create(NewPostPage, {}, { enableBackdropDismiss: false });
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
