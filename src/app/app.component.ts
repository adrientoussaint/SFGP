import { Component, ViewChild } from '@angular/core';

import { Events, MenuController, Nav, Platform, Config, ActionSheet, ActionSheetController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Storage } from '@ionic/storage';

import { AboutPage } from '../pages/about/about';
import { MapPage } from '../pages/map/map';
import { TabsPage } from '../pages/tabs/tabs';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { SchedulePage } from '../pages/schedule/schedule';
import { SpeakerListPage } from '../pages/speaker-list/speaker-list';
import { SponsorPage } from '../pages/sponsor/sponsor';
import { LiensPage } from '../pages/liens/liens';
import { PosterPage } from '../pages/poster/poster';
import { ApercuPage } from '../pages/apercu/apercu';
import { EventPage } from '../pages/event/event';

import { ConferenceData } from '../providers/conference-data';
import { UserData } from '../providers/user-data';

export interface PageInterface {
  title: string;
  name: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
  tabName?: string;
  tabComponent?: any;
}

@Component({
  templateUrl: 'app.template.html'
})
export class ConferenceApp {
  actionSheet: ActionSheet;
  // the root nav is a child of the root app component
  // @ViewChild(Nav) gets a reference to the app's root nav
  @ViewChild(Nav) nav: Nav;

  // List of pages that can be navigated to from the left menu
  // the left menu only works after login
  // the login page disables the left menu
  appPages: PageInterface[] = [
    { title: 'Programme Scientifique', name: 'TabsPage', component: TabsPage, tabComponent: SchedulePage, index: 0, icon: 'calendar' },
    { title: 'Posters', name: 'TabsPage', component: TabsPage, tabComponent: PosterPage, index: 1, icon: 'document' },
    { title: 'Conférenciers', name: 'TabsPage', component: TabsPage, tabComponent: SpeakerListPage, index: 2, icon: 'contacts' },
    { title: 'Plan', name: 'TabsPage', component: TabsPage, tabComponent: MapPage, index: 3, icon: 'map' }    
  ];
  loggedInPages: PageInterface[] = [
    { title: 'Aperçu du programme', name: 'ApercuPage', component: ApercuPage, icon: 'compass' },
    { title: 'Evènements', name: 'EventPage', component: EventPage, icon: 'alert' },
    { title: 'Sponsors', name: 'SponsorPage', component: SponsorPage, icon: 'pricetag' },
    { title: 'Liens utiles', name: 'LiensPage', component: LiensPage, icon: 'done-all' },
    { title: 'A propos', name: 'AboutPage', component: AboutPage, icon: 'information-circle' }
  ];
  rootPage: any;

  constructor(
    public events: Events,
    public userData: UserData,
    public menu: MenuController,
    public platform: Platform,
    public confData: ConferenceData,
    public storage: Storage,
    public splashScreen: SplashScreen,
    public config : Config,
    public actionSheetCtrl: ActionSheetController
  ) {
    // Check if the user has already seen the tutorial
    this.storage.get('hasSeenTutorial')
      .then((hasSeenTutorial) => {
        if (hasSeenTutorial) {
          this.rootPage = TabsPage;
        } else {
          this.rootPage = TutorialPage;
        }
        this.platformReady()
      });

    // load the conference data
    confData.load();

    // decide which menu items should be hidden by current login status stored in local storage
    this.userData.hasLoggedIn().then((hasLoggedIn) => {
      this.enableMenu(hasLoggedIn === true);
    });
    this.enableMenu(true);

    this.listenToLoginEvents();
    
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
        },
        {
          text: '+33.372.74.38.88',
          icon: 'call',
          handler: () => {
            window.open('tel:' + '+33372743888')
          }
        }
      ]
    });

    actionSheet.present();
  }

  openPage(page: PageInterface) {
    let params = {};

    // the nav component was found using @ViewChild(Nav)
    // setRoot on the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    if (page.index) {
      params = { tabIndex: page.index };
    }

    // If we are already on tabs just change the selected tab
    // don't setRoot again, this maintains the history stack of the
    // tabs even if changing them from the menu
    if (this.nav.getActiveChildNav() && page.index != undefined) {
      this.nav.getActiveChildNav().select(page.index);
    // Set the root of the nav with params if it's a tab index
  } else {
      this.nav.setRoot(page.name, params).catch((err: any) => {
        console.log(`Didn't set nav root: ${err}`);
      });
    }

    if (page.logsOut === true) {
      // Give the menu time to close before changing to logged out
      this.userData.logout();
    }
  }

  openTutorial() {
    this.nav.setRoot(TutorialPage);
  }

  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('user:signup', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('user:logout', () => {
      this.enableMenu(true);
    });
  }

  enableMenu(loggedIn: boolean) {
    this.menu.enable(loggedIn, 'loggedInMenu');
    this.menu.enable(!loggedIn, 'loggedOutMenu');
  }

  platformReady() {
    // Call any initial plugins when ready
    this.platform.ready().then(() => {
      this.splashScreen.hide();
    });
  }

  isActive(page: PageInterface) {
    let childNav = this.nav.getActiveChildNav();

    // Tabs are a special case because they have their own navigation
    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.tabName) {
        return 'primary';
      }
      return;
    }

    if (this.nav.getActive() && this.nav.getActive().name === page.name) {
      return 'primary';
    }
    return;
  }
}
