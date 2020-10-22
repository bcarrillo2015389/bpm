import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private alertCtr:AlertController) { }

  async presentAlert(textMessage) {
    const alert = await this.alertCtr.create({
      cssClass: 'style-alert',
      backdropDismiss:true,
      header: 'Excelente',
      message: textMessage,
      buttons: [
        {
          text: '✔ Aceptar'
        }
      ]
    });

    await alert.present();
  }

}
