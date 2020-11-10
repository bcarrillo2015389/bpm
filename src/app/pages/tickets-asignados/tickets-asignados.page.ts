import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from '../../services/loading/loading.service';
import { Storage } from '@ionic/storage';
import { DataService } from '../../services/data/data.service';
import { ToastService } from '../../services/toast/toast.service';
import { AlertService } from '../../services/alert/alert.service';

@Component({
  selector: 'app-tickets-asignados',
  templateUrl: './tickets-asignados.page.html',
  styleUrls: ['./tickets-asignados.page.scss'],
})
export class TicketsAsignadosPage implements OnInit {

  code;
  domain;
  items;

  status:boolean=true;

  constructor(private loadingService:LoadingService,
              private storage:Storage,
              private dataService:DataService,
              private toastService:ToastService,
              private alertService:AlertService) { }

  ngOnInit() {
  }

  async ionViewWillEnter(){
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

  closeAssignedTicket(code){
    this.dataService.closeTicket(this.domain, code).subscribe(async (res:any)=>{
      if(!res.status){
        this.toastService.presentToast(res.message, 'danger');
      }else if(res.status){
        
        await this.alertService.presentAlert(res.message);
        this.ionViewWillEnter();

      }else{
        this.toastService.presentToast('Ha ocurrido un error desconocido. Intente de nuevo.', 'danger');
      }
    });
  }
}
