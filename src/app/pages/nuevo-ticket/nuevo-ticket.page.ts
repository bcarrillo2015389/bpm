import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { PhotoService } from '../../services/photo/photo.service';
import { LoadingService } from '../../services/loading/loading.service';


@Component({
  selector: 'app-nuevo-ticket',
  templateUrl: './nuevo-ticket.page.html',
  styleUrls: ['./nuevo-ticket.page.scss'],
})
export class NuevoTicketPage implements OnInit {
  mensaje;
  source;
  
  constructor(private photoService:PhotoService,
              private actionSheetCtrl:ActionSheetController,
              private alertCtrl:AlertController,
              private loadingService:LoadingService) { }

  ngOnInit() {
  }

  async takePhoto(){
    await this.loadingService.presentLoading('Cargando...');
    this.source = await this.photoService.takePhoto();
    
    let album = document.getElementById('photo-album');
    let image = document.createElement('img');

    image.setAttribute('src', this.source.changingThisBreaksApplicationSecurity);
    image.setAttribute('style', 'width: 90%; height: 80%; margin-left: 5%; margin-right: 5%;');
    album.appendChild(image);
    this.loadingService.loadingDismiss();
  }

  async getGalleryPhoto(){
    await this.loadingService.presentLoading('Cargando...');
    this.source = await this.photoService.getGalleryPhoto();
    
    let album = document.getElementById('photo-album');
    let image = document.createElement('img');

    image.setAttribute('src', this.source.changingThisBreaksApplicationSecurity);
    image.setAttribute('style', 'width: 90%; height: 80%; margin-left: 5%; margin-right: 5%;');
    album.appendChild(image);
    this.loadingService.loadingDismiss();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Opciones',
      backdropDismiss:true,
      buttons: [
      {
        text: 'Cámara',
        icon: 'camera',
        cssClass:'action-item',
        handler: () => {
          this.takePhoto();
        }
      }, {
        text: 'Galería',
        icon: 'image',
        cssClass:'action-item',
        handler: () => {
          this.getGalleryPhoto();
        }
      }, {
        text: 'Cancelar',
        icon: 'close',
        cssClass:'cancel-item',
        role: 'cancel'
      }]
    });
    await actionSheet.present();
  }

  cleanFields(){
    let txtMessage = '¿Desea Limpiar la página?, si aún no a grabado perdera los datos escritos...'
    this.presentConfirmAlert(txtMessage);
  }

  async presentConfirmAlert(txtMessage) {
    const alert = await this.alertCtrl.create({
      cssClass: 'style-alert',
      header: 'Limpiar',
      message: txtMessage,
      buttons: [
        {
          text: '✔ Aceptar',
          handler: async (blah) => {
            await this.resetValues();
            this.loadingService.loadingDismiss();
          }
        },
        {
          text: '✖ Cancelar',
          role: 'cancel',
          cssClass: 'secondary-button'
        }
      ]
    });

    await alert.present();
  }

  async resetValues(){
    await this.loadingService.presentLoading('Cargando...');

    //Limpiar los campos del formulario
    let fields = document.getElementsByTagName('ion-select');
    for (let i = 0; i < fields.length; i++) {
      fields[i].value='';
    }

    //Limpiar el album de photos
    let album = document.getElementById('photo-album');
    let images = document.getElementsByTagName('img');

    for (let i = 0; i < images.length; i++) {
      album.removeChild(images[i]);
    }

    //Limpiar el text-area
    (<HTMLInputElement>document.getElementById('areaMensaje')).value = '';
  }

}