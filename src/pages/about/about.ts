import { Component } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ActionSheet, ActionSheetController, Config } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  actionSheet: ActionSheet;
  constructor(private iab: InAppBrowser,
              public actionSheetCtrl: ActionSheetController,
              public config: Config){}

open(site :any){
    this.iab.create(site, '_system');
  }

   openHelp() {
    let mode = this.config.get('mode');

    let actionSheet = this.actionSheetCtrl.create({
      title: 'Une requête ?',
      buttons: [
        {
          text: `contact@progepi.fr`,
          icon: mode !== 'ios' ? 'mail' : null,
          handler: () => {
            window.open('mailto:' + 'contact@progepi.fr');
          }
        }
      ]
    });

    actionSheet.present();
  }
  
}
