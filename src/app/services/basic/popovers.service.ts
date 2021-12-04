import { Injectable } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class PopoversService {

  constructor(public popoverController: PopoverController) { }

  present(ev: any, data = {}, cssClass = 'my-custom-class'): Promise<any> {

    return new Promise( async resolve => {

      
    })
    
  }


}
