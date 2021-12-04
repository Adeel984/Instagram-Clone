import { Component, Injector, OnInit } from '@angular/core';
import { inject } from '@angular/core/testing';
import { BasePage } from '../base-page/base-page';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage extends BasePage {

  item: any
  user: any
  constructor(private inj: Injector) { 
    super(inj)
    this.item = this.getQueryParams();
    this.getUser(this.item.userId)
    console.log('Item', this.item);
    
  }

  ngOnInit() {
  }

  async getUser(user_id){
    console.log(user_id);
    this.user = await this.sqlite.getUserById(user_id);
    console.log(this.user);
  }

}
