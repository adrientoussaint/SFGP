import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { ConferenceData } from '../../providers/conference-data';
/**
 * Generated class for the Poster page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-poster',
  templateUrl: 'poster.html',
})
export class PosterPage {
  private posters: any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public confData: ConferenceData, private iab: InAppBrowser) {
  }

  ionViewDidLoad() {
    this.confData.getPosters().subscribe((posters: any[]) => {
      this.posters = posters;  
    });
  }
  
  open(site :any){
    let url = 'http://www.sfgp2017-nancy.com/_Abstracts/' + site + '.pdf'
    this.iab.create(url, '_system');
  }

}
