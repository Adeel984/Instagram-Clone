import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  nativeStorage = localStorage;
  constructor(/*private nativeStorage: NativeStorage*/) { }

  set(key, data): Promise<boolean>{

    return new Promise( resolve => {

      this.nativeStorage.setItem(key, JSON.stringify(data))
      resolve(true);
      // .then(
      //   () => resolve(true),
      //   error => resolve(false)
      // );
    });

  }

  get(key): Promise<any>{

    return new Promise( resolve => {
      let data = this.nativeStorage.getItem(key);
      resolve(JSON.parse(data))
      // .then(
      //   data => { console.log("getKey", data);  resolve(data) },
      //   error => resolve(null)
      // );
    });

  }

}
