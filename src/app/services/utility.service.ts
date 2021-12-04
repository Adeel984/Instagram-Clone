import { StringsService } from './basic/strings.service';
import { ImageService } from './image.service';
import { Injectable } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { OpenNativeSettings } from '@ionic-native/open-native-settings/ngx';
import { Platform } from '@ionic/angular';
import { AlertsService } from './basic/alerts.service';
import { LoadingService } from './basic/loading.service';
import { StorageService } from './basic/storage.service';
import { TimesService } from './times.service';
import { GeolocationsService } from './geolocations.service';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator/ngx';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {


  constructor(public loading: LoadingService,
    public plt: Platform,
    private imagePicker: ImagePicker,
    private launchNavigator: LaunchNavigator,
    private callNumber: CallNumber,
    private iab: InAppBrowser,
    private openNativeSettings: OpenNativeSettings,
    public alerts: AlertsService,
    public images: ImageService,
    public times: TimesService,
    public geolocations: GeolocationsService,
    public strings: StringsService,
    public storage: StorageService
  ) {
  }

  showLoader(msg = 'Please wait...') {
    return this.loading.showLoader(msg);
  }

  hideLoader() {
    return this.loading.hideLoader();
  }

  showAlert(msg) {
    return this.alerts.showAlert(msg);
  }

  presentToast(msg) {
    return this.alerts.presentToast(msg);
  }

  presentSuccessToast(msg) {
    return this.alerts.presentSuccessToast(msg);
  }

  presentFailureToast(msg) {
    return this.alerts.presentFailureToast(msg);
  }

  presentConfirm(okText = 'OK', cancelText = 'Cancel', title = 'Are You Sure?', message = ''): Promise<boolean> {
    return this.alerts.presentConfirm(okText = okText, cancelText = cancelText, title = title, message = message);
  }

  openContactFormUrl() {
    var link = "http://zuulsystems.com/contact/";
    const browser = this.iab.create(link, '_blank', 'location=no');
    browser.show();
  }

  isOverThirteen(dob) {
    return this.times.isOverThirteen(dob);
  }

  public dialMyPhone(num) {
    this.callNumber.callNumber(num, true)
  }

  public openDirectionInMap(destination) {
    this.launchNavigator.navigate(destination);
  }

  

  /** Storage Service */

  setKey(key, value) {
    return this.storage.set(key, value);
  }

  getKey(key) {
    return this.storage.get(key);
  }

 

  

  /** Strings Service */

  capitalizeEachFirst(str) {
    return this.strings.capitalizeEachFirst(str);
  }

  formatPhoneNumberRuntime(phoneNumber) {
    return this.strings.formatPhoneNumberRuntime(phoneNumber);
  }

  isPhoneNumberValid(number) {
    return this.strings.isPhoneNumberValid(number)
  }

  checkIfMatchingPasswords(passwordKey, passwordConfirmationKey) {
    return this.strings.checkIfMatchingPasswords(passwordKey, passwordConfirmationKey);
  }

  parseAddressFromProfile(__profile) {
    return this.strings.parseAddressFromProfile(__profile);
  }

  isLastNameExist(input) {
    return this.strings.isLastNameExist(input);
  }


  /* Immage Service */
  snapImage(type) {
    return this.images.snapImage(type);
  }

  convertImageUrltoBase64(url) {
    return this.images.convertImageUrltoBase64(url);
  }

  /* Time Service */

  showDatePicker(date, mode = 'date'): Promise<any> {
    return this.times.showDatePicker(date, mode);
  }

  diffInHours(start_date, end_date) {
    return this.times.diffInHours(start_date, end_date)
  }

  formatDate(date) {
    return this.times.formatDate(date)
  }

  formatDateTime(date) {
    return this.times.formatDateTime(date);
  }

  formatDateMDYHM(date) {
    return this.times.formatDateMDYHM(date);
  }

  formatAMPM(_dt) {
    return this.times.formatAMPM(_dt);
  }

  customMDYHMformatDateMDYHM(_date) {
    return this.times.customMDYHMformatDateMDYHM(_date);
  }

  formatHoursToText(hour) {
    return this.times.formatHoursToText(hour);
  }

  formatDateMDY(date) {
    return this.times.formatDateMDY(date);
  }

  /* Geolocations */

  getCoordsForGeoAddress(address, _default = true) {
    return this.geolocations.getCoordsForGeoAddress(address, _default = true)
  }

  getCoordsViaHTML5Navigator() {
    return this.geolocations.getCoordsViaHTML5Navigator();
  }

  getCurrentLocationCoordinates() {
    return this.geolocations.getCurrentLocationCoordinates();
  }

  public async getCurrentLocation(lat, long) {

    var self = this;
    //this.storage.get('current_location').then((loc) => {
    let coords = await this.geolocations.getCurrentLocationCoordinates();

    var lt = coords['lat']
    var lg = coords['lng']
    // console.log(lt,lg);
    // var lt = (lat) ? lat : 0;
    // var lg = (long) ? long : 0;
    // var coords = {lat: lt, lng: lg};
    this.launchNavigator.availableApps()
      .then(data => {

        if (data['google_maps']) {
          var options: LaunchNavigatorOptions = {
            start: [lt, lg],
            app: this.launchNavigator.APP.GOOGLE_MAPS
          };
          this.launchNavigator.navigate([lat, long], options)
        } else if (data['apple_maps']) {
          options = {
            start: [lt, lg],
            app: this.launchNavigator.APP.APPLE_MAPS
          };
          this.launchNavigator.navigate([lat, long], options)

        } else {
          self.presentToast("No Map software available");
        }

      })
      .catch(err => {
        self.presentToast(err);
      });


    // });


  }






}
