import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { PhotoService } from '../../services/photo/photo.service';


@Component({
  selector: 'app-nuevo-ticket',
  templateUrl: './nuevo-ticket.page.html',
  styleUrls: ['./nuevo-ticket.page.scss'],
})
export class NuevoTicketPage implements OnInit {
  mensaje;
  source;
  
  constructor(private photoService:PhotoService,
              private actionSheetCtrl:ActionSheetController) { }

  ngOnInit() {
  }

  async takePhoto(){
    this.source = await this.photoService.takePhoto();
    
    let album = document.getElementById('photo-album');
    let image = document.createElement('img');

    image.setAttribute('src', this.source.changingThisBreaksApplicationSecurity);
    image.setAttribute('style', 'width: 90%; height: 80%; margin-left: 5%; margin-right: 5%;');
    album.appendChild(image);
  }

  async getGalleryPhoto(){
    this.source = await this.photoService.getGalleryPhoto();
    
    let album = document.getElementById('photo-album');
    let image = document.createElement('img');

    image.setAttribute('src', this.source.changingThisBreaksApplicationSecurity);
    image.setAttribute('style', 'width: 90%; height: 80%; margin-left: 5%; margin-right: 5%;');
    album.appendChild(image);
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

}
