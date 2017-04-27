import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
  selector: 'page-session-detail',
  templateUrl: 'session-detail.html'
})
export class SessionDetailPage {
  
  session: any;
  constructor(public navParams: NavParams, private browser: InAppBrowser,) {
    this.session = navParams.data.session;
    this.browser = browser;
  }
  launch(url : any) {
      this.browser.create(url, "_system", "location=true");
        
    }
}
