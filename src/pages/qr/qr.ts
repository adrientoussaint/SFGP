import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner'


@Component({
    selector: 'page-qr',
  templateUrl: 'qr.html'
})
export class QrPage {
  
  options: BarcodeScannerOptions;

  constructor(private barcode: BarcodeScanner,public navCtrl:NavController) {
    
    }

    async scanBarcode(){
        const results = await this.barcode.scan();
        console.log(results);
    }
  
                               
}

  

  

 

