import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LoadingService } from '../../services/loading/loading.service';
import { TicketModalComponent } from '../../components/ticket-modal/ticket-modal.component';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.page.html',
  styleUrls: ['./tickets.page.scss'],
})
export class TicketsPage implements OnInit {
  items;

  constructor(private loadingService:LoadingService,
              private modalCtrl:ModalController) { }

  async ngOnInit() {
    await this.loadingService.presentLoading('Cargando...');
    this.items = [{
      codigo:2101,
      incidente:'Ácido derramado',
      status:'Reportado',
      prioridad:'Alta',
      categoria:'SGI',
      fecha:'28/09/2020'
    },{
      codigo:2102,
      incidente:'Piso Sucio',
      status:'Reportado',
      prioridad:'Baja',
      categoria:'SGI',
      fecha:'30/09/2020'
    },{
      codigo:2103,
      incidente:'Vidrio roto',
      status:'Solucionado',
      prioridad:'Alta',
      categoria:'SGI',
      fecha:'29/09/2020'
    }];

    this.loadingService.loadingDismiss();
  }

  async mostrarModal(codigo){
    const modal = await this.modalCtrl.create({
      component: TicketModalComponent,
      componentProps:{
        codigo:codigo
      }
    });

    await modal.present();
  }

}
