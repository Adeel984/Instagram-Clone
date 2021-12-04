import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserPostsPageRoutingModule } from './user-posts-routing.module';

import { UserPostsPage } from './user-posts.page';
import { FbpostComponent } from '../components/fbpost/fbpost.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserPostsPageRoutingModule
  ],
  declarations: [UserPostsPage,FbpostComponent]
})
export class UserPostsPageModule {}
