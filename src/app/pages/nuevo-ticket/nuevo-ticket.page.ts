import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { PhotoService } from '../../services/photo/photo.service';
import { LoadingService } from '../../services/loading/loading.service';
import { Storage } from '@ionic/storage';
import { DataService } from '../../services/data/data.service';
import { ToastService } from '../../services/toast/toast.service';
import { AlertService } from '../../services/alert/alert.service';


@Component({
  selector: 'app-nuevo-ticket',
  templateUrl: './nuevo-ticket.page.html',
  styleUrls: ['./nuevo-ticket.page.scss'],
})
export class NuevoTicketPage implements OnInit {
  
  domain;
  description;
  source;

  area:any={};
  areaOptions:any=[];

  incident:any={};
  incidentOptions:any=[];

  priorityOptions:any=[];
  
  constructor(private photoService:PhotoService,
              private actionSheetCtrl:ActionSheetController,
              private alertCtrl:AlertController,
              private loadingService:LoadingService,
              private storage:Storage,
              private dataService:DataService,
              private toastService:ToastService,
              private alertService:AlertService) { }

  async ngOnInit() {
    await this.loadingService.presentLoading('Cargando...');

    await this.storage.get('token').then(
      async user => {
        this.domain = user.dominio;

        await this.dataService.getAreas(this.domain).subscribe((res:any)=>{
          this.areaOptions = res.data;
        });

        await this.dataService.getIncidents(this.domain).subscribe((res:any)=>{
          this.incidentOptions = res.data;
        });

        await this.dataService.getPriorities(this.domain).subscribe((res:any)=>{
          this.priorityOptions = res.data;
          this.loadingService.loadingDismiss();
        });
      }
    );
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

  saveTicket(){
   if(this.area && this.incident){
    this.dataService.saveTicket(this.domain, this.area.sede, this.incident.categoria, this.area.area, 
      this.area.sector, this.incident.incidente, this.incident.prioridad, this.description).subscribe(async (res:any)=>{
        if(!res.status){

          this.toastService.presentToast(res.message, 'danger');

        }else if(res.status){

          await this.resetValues();
          this.loadingService.loadingDismiss();
          this.alertService.presentAlert(res.message);
          
        }else{
          this.toastService.presentToast('Ha ocurrido un error desconocido. Intente de nuevo.', 'danger');
        }
    });
   }else{
    this.toastService.presentToast('Los campos necesarios no están completos.', 'danger');
   }
  }

}