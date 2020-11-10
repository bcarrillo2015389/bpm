import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { PhotoService } from '../../services/photo/photo.service';
import { DataService } from '../../services/data/data.service';
import { ToastService } from '../../services/toast/toast.service';
import { AlertService } from '../../services/alert/alert.service';
import { LoadingService } from '../../services/loading/loading.service';
import { Storage } from '@ionic/storage';
import { getLocaleTimeFormat } from '@angular/common';

@Component({
  selector: 'app-actualizar-ticket',
  templateUrl: './actualizar-ticket.page.html',
  styleUrls: ['./actualizar-ticket.page.scss'],
})
export class ActualizarTicketPage implements OnInit {

  domain;
  description;
  source;
  code;

  item:any={};

  area:any={};
  areaOptions:any=[];

  incident:any={};

  incidentOptions:any=[];

  priorityOptions:any=[];

  constructor(private route:ActivatedRoute,
              private photoService:PhotoService,
              private actionSheetCtrl:ActionSheetController,
              private dataService:DataService,
              private toastService:ToastService,
              private alertService:AlertService,
              private loadingService:LoadingService,
              private storage:Storage) { }
  
  async ngOnInit(){

    await this.loadingService.presentLoading('Cargando...');

    this.code = this.route.snapshot.paramMap.get('codigo');

    await this.storage.get('token').then(
      async user => {
        this.domain = user.dominio;

        //Funciones en cadena
        await this.dataService.getAssignedTickets(this.domain, user.codigo).subscribe(async (res:any)=>{
          this.item = await res.data.find(ticket => ticket.codigo==this.code);

          await this.dataService.getAreas(this.domain).subscribe(async(res:any)=>{
            this.areaOptions = res.data;

            await this.dataService.getIncidents(this.domain).subscribe(async (res:any)=>{
              this.incidentOptions = res.data;

              await this.dataService.getPriorities(this.domain).subscribe(async(res:any)=>{
                this.priorityOptions = res.data;
                this.description = this.item.descripcion;
                
                await this.fillFields();
                this.loadingService.loadingDismiss();

              });
            });
          });

        });

      }
    );
  }

  async fillFields() {

    this.area = await this.areaOptions.find(item => {
      return item.nombre==this.item.area && item.nivel==this.item.nivel
    });

    this.incident = await this.incidentOptions.find(item => item.nombre==this.item.incidente);
    
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

  cleanFields(){
    
  }

  modifyTicket(){
    if(this.area && this.incident){
      this.dataService.modifyTicket(this.domain, this.code,this.area.sede, this.incident.categoria, this.area.area, 
        this.area.sector, this.incident.incidente, this.incident.prioridad, this.description).subscribe(async (res:any)=>{
          if(!res.status){
            this.toastService.presentToast(res.message, 'danger');
      
          }else if(res.status){
  
            await this.ngOnInit();
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
