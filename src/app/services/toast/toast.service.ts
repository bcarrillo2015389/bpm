import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastCtrl:ToastController) { }

  async presentToast(txtMessage, statusColor) {
    const toast = await this.toastCtrl.create({
      message: txtMessage,
      duration: 2000,
      position:'top',
      color: statusColor
    });
    toast.present();
  }
}
