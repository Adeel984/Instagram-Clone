import { HttpClient } from '@angular/common/http';
import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from '../base-page/base-page';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage extends BasePage implements OnInit {

  plist = [];
  _loading = false
  constructor(injector: Injector) { 
    super(injector);
    this.setList();
  }

  async setList(){
    this.plist = await this.sqlite.getAllUsers() as any[];
    console.log("i am here", this.plist);
  }

  ngOnInit() {
    
  }

  async addSignup(){

    await this.users.getDatabseOfUser() as any[];
    this.plist = await this.sqlite.getAllUsers() as any[];
    console.log(this.plist);

  }

  // signUp(){
  //   console.log("clicked");
    
  //   if((this.password && this.email) == ''){
  //     this.network.httpGetResponse('https://randomuser.me/api/').then( response => {
  //       localStorage.setItem('user', JSON.stringify(response.results[0]));
  //       localStorage.setItem ('email', response.results[0].email)
  //       localStorage.setItem ('password', response.results[0].login.password)
  
  //       this.email = localStorage.getItem('email');
  //       this.password = localStorage.getItem('password')
  //     })
    
  //   } else{
  //     this.nav.push('login');
  //   }
   

    
    
  // }

}
