import { Component, Injector, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { BasePage } from '../base-page/base-page';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.page.html',
  styleUrls: ['./comments.page.scss'],
})
export class CommentsPage extends BasePage {

  item: any
  user: any
  usersList: any = [];
  comments: any[] = [];
  compliments = ["Loving!","Your feed is lit", "You cook like no other!", "Pretty stunning shot!", "Nice feed!", "This is called a perfect shot" , "This is so cool" ]

  constructor( public actionSheetController: ActionSheetController, private inj: Injector) { 
    super(inj)
  }

  async ngOnInit() {

    this.item = this.getQueryParams();
    this.getUser(this.item.userId)
    console.log('Item', this.item);
    this.usersList = await this.users.getDatabseOfUser() as any[];
    this.usersList.forEach(_user => {
      if(this.user.username !== _user.username){ // Only show other user comments 
        this.comments.push({
          "comment": this.compliments[Math.floor(Math.random() * (this.compliments.length -1))],
          "likes": Math.floor(Math.random() * 10),
          "image": _user.picture,
          "time": Math.floor(Math.random() * 60)
      });
      }
     
    });

    this.comments.sort((a,b) => a.time - b.time )
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

  async getUser(user_id){
    console.log(user_id);
    this.user = await this.sqlite.getUserById(user_id);
    console.log(this.user);
  }

}
