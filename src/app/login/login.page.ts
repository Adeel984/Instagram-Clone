import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BasePage } from '../base-page/base-page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage extends BasePage implements OnInit {

  aForm: FormGroup;
  submitAttempt = false;
  sw_user: any = null;
  
  constructor(injector: Injector, public formBuilder: FormBuilder) { 
    super(injector);
    this.setupForm()
  }

  ngOnInit() {
  }

  setupForm() {

    var re = /\S+@\S+\.\S+/;

    this.aForm = this.formBuilder.group({
      username: ['orangemouse292', Validators.compose([Validators.required]) /*, VemailValidator.checkEmail */],
      password: ['away', Validators.compose([Validators.minLength(3), Validators.maxLength(30), Validators.required])]
    })

  }

  async login() {
    this.submitAttempt = true;
    var formdata = this.aForm.value;
    console.log(formdata);
    
    let flag = await this.users.login(formdata);
    console.log(flag);
    if(flag){
      this.nav.push('dashboard');
    }else{
      this.utility.presentFailureToast("Invalid Login");
    }    
  }

  signup() {
    this.nav.setRoot('signup');
  }

}
