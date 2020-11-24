import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LoadingService } from '../../services/loading/loading.service';
import { TicketModalComponent } from '../../components/ticket-modal/ticket-modal.component';
import { DataService } from '../../services/data/data.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.page.html',
  styleUrls: ['./tickets.page.scss'],
})
export class TicketsPage implements OnInit {
  
  userCode;
  domain;
  items;

  status:boolean = true;

  constructor(private loadingService:LoadingService,
              private modalCtrl:ModalController,
              private storage:Storage,
              private dataService:DataService) { }

  async ngOnInit() {
    await this.loadingService.presentLoading('Cargando...');

    await this.storage.get('token').then(
      async user =>{
        this.userCode = user.codigo;
        this.domain = user.dominio;

        await this.dataService.getReportedTickets(this.domain, this.userCode).subscribe((res:any)=>{

          this.status = res.status;
          this.items = res.data;
          this.loadingService.loadingDismiss();
        });
      }
    );
  }

  async mostrarModal(item){

    this.storage.set('reportedTicket',item);

    const modal = await this.modalCtrl.create({
      component: TicketModalComponent,
      componentProps:{
        code:item.codigo
      }
    });

    await modal.present();
  }

  async doRefresh(ev){
    await this.ngOnInit();
    ev.target.complete();
  }

}
