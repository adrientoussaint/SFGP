import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { PhotoViewer } from '@ionic-native/photo-viewer';

/**
 * Generated class for the Apercu page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-apercu',
  templateUrl: 'apercu.html',
})
export class ApercuPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public phtViewer: PhotoViewer) {
  }
  Zoom(id:any){  
  this.phtViewer.show('http://www.sfgp2017-nancy.com/_media/img/large/j'+id+'.jpg', 'Jour '+id,{share:false})
  }
}
