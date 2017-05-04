import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
  selector: 'page-session-detail',
  templateUrl: 'session-detail.html'
})
export class SessionDetailPage {
  
  session: any;
  constructor(public navParams: NavParams, private iab: InAppBrowser) {
    this.session = navParams.data.session;
    
  }
  
  open(site :any){
    let url = 'http://www.sfgp2017-nancy.com/_Abstracts/' + site + '.pdf'
    const browser = this.iab.create(url, '_blank');
    browser.show();
  }
  
}
