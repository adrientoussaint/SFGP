import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ConferenceData } from '../../providers/conference-data';

@Component({
  selector: 'page-event',
  templateUrl: 'event.html',
})
export class EventPage {
  private events: any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public confData: ConferenceData) {
  }

  ionViewDidLoad() {
    this.confData.getEvents().subscribe((event: any[]) => {
      this.events = event;
    });
  }
  


}
