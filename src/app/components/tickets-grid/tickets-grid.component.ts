import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LoadingService } from '../../services/loading/loading.service';
import { Storage } from '@ionic/storage';
import { DataService } from '../../services/data/data.service';
import { ToastService } from '../../services/toast/toast.service';
import { AlertService } from '../../services/alert/alert.service';

@Component({
  selector: 'app-tickets-grid',
  templateUrl: './tickets-grid.component.html',
  styleUrls: ['./tickets-grid.component.scss'],
})
export class TicketsGridComponent implements OnInit {

  code;
  domain;
  items;

  status:boolean = true;


  constructor(private alertCtr:AlertController,
              private loadingService:LoadingService,
              private router:Router,
              private storage:Storage,
              private dataService:DataService,
              private toastService:ToastService,
              private alertService:AlertService) { }

  async ngOnInit() {
    await this.loadingService.presentLoading('Cargando...');
    
    await this.storage.get('token').then(
      async user => {
        this.code = user.codigo;
        this.domain = user.dominio;

        await this.dataService.getAssignedTickets(this.domain, this.code).subscribe((res:any)=>{

          this.status = res.status;

          this.items = res.data;
          this.loadingService.loadingDismiss();
        });
      }
    );
  }

  handleTramiteTicket(item){
    this.router.navigateByUrl('tramite-ticket/'+item.codigo);
  }

  handleCloseTicket(code){
    this.presentConfirmAlert('¿Desea cerrar este ticket del listado?, no prodrá ser usada después...',code);
  }

  async presentConfirmAlert(txtMessage,code) {
    const alert = await this.alertCtr.create({
      cssClass: 'style-alert',
      header: 'Cerrar ticket',
      message: txtMessage,
      buttons: [
        {
          text: '✔ Aceptar',
          handler: (blah) => {
            this.closeAssignedTicket(code);
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

  closeAssignedTicket(code){
    this.dataService.closeTicket(this.domain, code).subscribe(async (res:any)=>{
      if(!res.status){
        this.toastService.presentToast(res.message, 'danger');
      }else if(res.status){
        
        await this.alertService.presentAlert(res.message);
        this.ngOnInit();

      }else{
        this.toastService.presentToast('Ha ocurrido un error desconocido. Intente de nuevo.', 'danger');
      }
    });
  }

}
