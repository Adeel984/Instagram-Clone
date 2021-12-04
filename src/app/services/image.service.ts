import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertsService } from './basic/alerts.service';
import { ModalService } from './basic/modal.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(public alerts: AlertsService, private camera: Camera, public modals: ModalService) { }

  snapImage(type) {

    return new Promise(async (resolve) => {


      const radioOptions = [
        {
          type: 'radio',
          label: 'Camera',
          value: '1',
          checked: false
        },
        {
          type: 'radio',
          label: 'Gallery',
          value: '0',
          checked: false
        }
      ]

      const option = await this.alerts.presentRadioSelections('Select From', '', radioOptions)

      if (option == null) { resolve(null); return }

      var options: CameraOptions = {
        quality: 100,
        targetWidth: 1024,
        saveToPhotoAlbum: false,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        sourceType: parseInt(option)
      }

      this.camera.getPicture(options).then((imageData) => {

        if (imageData) {
          this.cropWithController('data:image/jpeg;base64,' + imageData, type)
            .then(image => 
              resolve(image),
            err => console.error(err))
        }
      });

    });
  }

  cropWithController(imageData, type) {
    function getCropOptions() {

      if (type == "licence") {

        const c = {
          dragMode: 'crop',
          aspectRatio: 16 / 9,
          autoCrop: true,
          movable: true,
          zoomable: true,
          scalable: true,
          autoCropArea: 0.8,
        };

        return c;

      } else {

        const c = {
          dragMode: 'crop',
          aspectRatio: 1,
          autoCrop: true,
          movable: true,
          zoomable: true,
          scalable: true,
          autoCropArea: 0.8,
        };

        return c;

      }

    }

    return new Promise(async (resolve, reject) => {

      

    })


  }

  convertImageUrltoBase64(url) {
    console.log("here-url-", url);
    
    return new Promise((resolve) => {
      if(!url){
        resolve(null);
      }else{
        if (!this.isValidUrl(url) || (/^http/.test(url))) {
          var index = url.lastIndexOf("/") + 1;
          var filename = url.substr(index);
          resolve(filename);
        } else {
          this.convertToDataURLviaCanvas(url).then(base64 => {
            resolve(this.getRB64fromB64(base64));
          })
        }
      }
      

    });
  }

  isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  }

  private convertToDataURLviaCanvas(url, outputFormat = "image/jpeg") {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = () => {
        let canvas = <HTMLCanvasElement>document.createElement('CANVAS'),
          ctx = canvas.getContext('2d'),
          dataURL;
        canvas.height = img.height;
        canvas.width = img.width;
        ctx.drawImage(img, 0, 0);
        dataURL = canvas.toDataURL(outputFormat);
        resolve(dataURL);
        canvas = null;
      };
      img.src = url;
    });
  }

  public getRB64fromB64(str) {
    return str.substring(str.indexOf(",") + 1);
  }

}
