import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  loading:any;

  constructor(private loadingCtrl:LoadingController) { }

  async presentLoading(message:string) {
    this.loading = await this.loadingCtrl.create({
     cssClass: 'my-custom-class',
     message
   });
   return this.loading.present();
 }

 loadingDismiss(){
  this.loading.dismiss();
 }
 
}
