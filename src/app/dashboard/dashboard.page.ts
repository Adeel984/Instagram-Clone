import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from '../base-page/base-page';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage extends BasePage implements OnInit {

  plist = [];
  full_plist = [];
  stored_users = [];
  back = false;
  user;
  
  constructor(injector: Injector) {
    super(injector);
    this.initialize();
   }

  ngOnInit() {
    
  }

  async initialize(){

    this.stored_users = await this.users.getDatabseOfUser() as any[];
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

      let username = this.activatedRoute.snapshot.params.username;
      console.log(username);

      if(username){

        this.back = true;
        this.user = await this.sqlite.getUserByUsername(username) as any;
        this.plist = await this.sqlite.getAllPosts(this.user.id) as any[];

      }else{

        if(paginate){

          for(var i = 0; i < 10; i++){
            var plist_item = this.full_plist[Math.floor(Math.random() * this.full_plist.length)];
            this.plist.push(plist_item);
          }
  
          resolve(true)
  
        }else{

          this.plist = await this.sqlite.getAllPosts() as any[];
  
          // this.network.httpGetResponse('https://jsonplaceholder.typicode.com/posts').then( async data => {
  
          //   this.plist = [];
          //   let items = await this.utility.getKey('posts') as any[];
            
          //   console.log(data, items);
  
          //   // attach random users to each post 
          //   this.full_plist = data.map((obj) => {
          //     // picka random user and attach 
          //     var user = this.stored_users[Math.floor(Math.random() * this.stored_users.length)];
          //     obj['user'] = user
          //     return obj;
          //   });
  
          //   for(var i = 0; i < 10; i++){
          //     var plist_item = this.full_plist[Math.floor(Math.random() * this.full_plist.length)];
          //     this.plist.push(plist_item);
          //   }
  
          //   await this.utility.setKey('posts', this.full_plist);
  
          //   resolve()
  
  
          // })
  
        }
      }
      
      

      


    })

  }

  showUserPosts(item){
    let username = item.username;
    console.log(item.username);

    this.nav.push('dashboard/'+username)

  }

}
