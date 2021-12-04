import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from '../base-page/base-page';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.page.html',
  styleUrls: ['./user-posts.page.scss'],
})
export class UserPostsPage extends BasePage implements OnInit {

  plist = [];
  full_plist = [];
  back = false;
  user;
  userName;
  
  constructor(injector: Injector) {
    super(injector);
    this.initialize();
   }

  ngOnInit() {
    
  }

  async initialize(){
    this.fetchPosts(true)
  }

  loadMore($event){

    this.fetchPosts(false, true).then( v => {
      if($event){
        $event.target.complete();
      }
      
    });

  }

  fetchPosts(showloader = true, paginate = false){

    return new Promise( async resolve => {
      let username = this.getQueryParams().username;
      this.userName = username;
      console.log("userName",username);
      this.back = true;
      this.user = await this.sqlite.getUserByUsername(username) as any;
      this.plist = await this.sqlite.getAllPosts(this.user.id) as any[];       
    })
  }
  
}
