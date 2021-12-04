import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { SqliteService } from 'src/app/services/sqlite.service';
import { ActionSheetController } from '@ionic/angular';
import { BasePage } from 'src/app/base-page/base-page';


@Component({
  selector: 'app-fbpost',
  templateUrl: './fbpost.component.html',
  styleUrls: ['./fbpost.component.scss'],
})
export class FbpostComponent extends BasePage {

  _item: any;
  user: any;
  user_id: any;
  get item(): any {
    return this._item;
  }
  @Input() set item(value: any){
    this._item = value;
    console.log(value);
    this.getUser(value.userId);

  };

  async getUser(user_id){
    console.log(user_id);
    this.user_id = user_id
    this.user = await this.sqlite.getUserById(user_id);
   
    console.log(this.user);
  }

  @Output('userposts') userposts: EventEmitter<any> = new EventEmitter<any>() 

  constructor(public sqlite: SqliteService, public actionSheetController: ActionSheetController, private inj: Injector) { 
    super(inj)
  }

  async ngOnInit() {
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Share',
      buttons: [{
        text: 'Twitter',
        icon: 'logo-twitter',
        handler: () => {
          console.log('Delete clicked');
        }
      }, {
        text: 'Instagram',
        icon: 'logo-instagram',
        handler: () => {
          console.log('Share clicked');
        }
      }, {
        text: 'TikTok',
        icon: 'logo-tiktok',
        handler: () => {
          console.log('Play clicked');
        }
      }, {
        text: 'Facebook',
        icon: 'logo-facebook',
        handler: () => {
          console.log('Favorite clicked');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }


  showSinglePost(item){
    console.log({item});
    this.router.navigate(
      ['/post'],
      { queryParams: {  ...item,  } }
    );
  }

  showComments(item){
    console.log({item});
    this.router.navigate(
      ['/comments'],
      { queryParams: {  ...item,  } }
    );
  }

  showUserProfile(){
    let currentRoute = this.router.url;
    console.log("currentRoute", currentRoute);
    if(!currentRoute.includes("user-posts")){
      let username = this.user?.username;
      console.log(username);
      this.nav.push('/user-posts',{username: username})
    }
    
  }

}
