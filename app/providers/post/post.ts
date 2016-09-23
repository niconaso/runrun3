import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Post provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Post {
  posts: Array<{ body: string, likes: number, comments: number, createdAt: Date }> = [];

  constructor(private http: Http) {
    for (let i = 1; i < 200; i++) {
      this.posts.push({
        body: this.randomString(this.randomNumber(200), '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
        likes: this.randomNumber(50),
        comments: this.randomNumber(50),
        createdAt: new Date()
      });
    }

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

  filterItems(searchTerm) {
    return this.posts.filter((post) => {
      return post.body.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });

  }

}
