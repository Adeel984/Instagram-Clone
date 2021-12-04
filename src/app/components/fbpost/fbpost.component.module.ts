import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { FbpostComponent } from './fbpost.component';

@NgModule({
	declarations: [
		FbpostComponent
	],
	imports: [
		CommonModule,
        IonicModule,
        NgModule,
        BrowserModule
	],
	exports: [
		FbpostComponent
	]
})
export class FbpostComponentModule {}