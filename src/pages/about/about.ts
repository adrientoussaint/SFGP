import { Component } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  constructor(private iab: InAppBrowser){}

open(site :any){
    const browser = this.iab.create(site, '_blank');
    browser.show();
  }

}
