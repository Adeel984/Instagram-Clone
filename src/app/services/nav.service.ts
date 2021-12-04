import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavService {

  constructor(public location: Location,public router: Router, public activatedRoute: ActivatedRoute) { }

  setRoot(page, param = {}){
    this.navigateTo(page, param);
  }

  push(page, param = {}){
    let extras: NavigationExtras = {
      queryParams: param
    }
    this.navigateTo(page, extras);
  }

  pop(){
    return new Promise( resolve => {
      this.location.back();
      resolve();
    });
  }

  navigateTo(link, data?: NavigationExtras){
    console.log(link);
    this.router.navigate([link], data);
  }

  navigateToChild(link, data?: NavigationExtras){
      data.relativeTo = this.activatedRoute;
      this.router.navigate([link], data);
  }

  getParams() {
      return this.activatedRoute.snapshot.params;
  }

  getQueryParams() {
      return this.activatedRoute.snapshot.queryParams;
  }

}
