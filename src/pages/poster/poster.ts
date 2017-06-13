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
  private posters: any = [];
  private theme: any;
  public thmIndex = 0;
  buttonclass:string = 't1';
  
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public confData: ConferenceData,
              private iab: InAppBrowser) {}

  ionViewDidLoad() {
    this.confData.getPosters().subscribe((posters: any[]) => {
      this.theme = posters;
      this.posters = posters[this.thmIndex].poster
    });
  }
  
  changeThmIndex(theme:any){
    this.thmIndex=theme;
    this.ionViewDidLoad();
  }
  
  open(site :any){
    let url = 'http://www.sfgp2017-nancy.com/_Abstracts/' + site + '.pdf'
    this.iab.create(url, '_system');
  }
  
    getPoster(ev: any) {
    // Reset items back to all of the items
    this.ionViewDidLoad();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.posters = this.posters.filter((poster : any) => {
        return (poster.name.toLowerCase().indexOf(val.toLowerCase()) > -1 || poster.description.toLowerCase().indexOf(val.toLowerCase()) > -1 || poster.titre.toLowerCase().indexOf(val.toLowerCase()) > -1 );
      })
    }
  }

}
