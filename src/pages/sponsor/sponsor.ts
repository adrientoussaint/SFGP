import { Component } from '@angular/core';

import { ActionSheet, ActionSheetController, Config, NavController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { ConferenceData } from '../../providers/conference-data';

@Component({
    selector: 'page-sponsor',
  templateUrl: 'sponsor.html'
})
export class SponsorPage {
  actionSheet: ActionSheet;
  private sponsors: any; 

  constructor(
    public actionSheetCtrl: ActionSheetController,
    public navCtrl: NavController,
    public confData: ConferenceData,
    public config: Config,
    public inAppBrowser: InAppBrowser)
    {}

    ionViewDidLoad() {
    this.confData.getSponsors().subscribe((sponsors: any[]) => {
      this.sponsors = sponsors;
      console.log(sponsors);
    });
  }
  
                               
}

  

  

 

