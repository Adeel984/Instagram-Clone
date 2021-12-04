import { Injectable } from '@angular/core';
import { NgxPubSubService } from '@pscoped/ngx-pub-sub';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  latestEvent = 'randomLast';
  historicalEvent = 'randomHistory';

  subscriptions;

  constructor(public pubsubSvc: NgxPubSubService) { 
    pubsubSvc.registerEventWithHistory(this.historicalEvent, 6);
    pubsubSvc.registerEventWithLastValue(this.latestEvent, undefined);
  }

  publish(key: string, data = {}){ 
    this.pubsubSvc.publishEvent(key, data);
  }

  subscribe(key, handler ){
    this.pubsubSvc.subscribe(key, data =>  handler(data) );
    // this.subscriptions[key] = 
  }

  unsubscribe(key){
    // this.subscriptions[key].unsubscribe();
  }

}
