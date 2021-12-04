import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NgxPubSubService } from '@pscoped/ngx-pub-sub';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiService } from './services/api.service';
import { StorageService } from './services/basic/storage.service';
import { EventsService } from './services/events.service';
import { NetworkService } from './services/network.service';
import { LaunchNavigator } from '@ionic-native/launch-navigator/ngx';
import { StringsService } from './services/basic/strings.service';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { OpenNativeSettings } from '@ionic-native/open-native-settings/ngx';
import { Platform } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AlertsService } from './services/basic/alerts.service';
import { LoadingService } from './services/basic/loading.service';
import { TimesService } from './services/times.service';
import { GeolocationsService } from './services/geolocations.service';
import { HttpClientModule, HttpClient, HttpHandler } from '@angular/common/http';
import { SqliteService } from './services/sqlite.service';
import { SQLite } from '@ionic-native/sqlite/ngx';



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule,  ],
  providers: [
    StatusBar,
    SplashScreen,
    EventsService,
    StorageService,
    ApiService,
    NetworkService,
    SQLite,
    ImagePicker,
    LaunchNavigator,
    CallNumber,
    Location,
    InAppBrowser,
    StringsService,
    GeolocationsService,
    TimesService,
    OpenNativeSettings,
    SqliteService,
    AlertsService,
    LoadingService,
    Camera,
    DatePicker,
    Geolocation,
    NativeStorage,
    NgxPubSubService,

    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
