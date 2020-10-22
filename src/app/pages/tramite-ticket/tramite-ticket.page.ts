import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { StatusModalComponent } from '../../components/status-modal/status-modal.component';

@Component({
  selector: 'app-tramite-ticket',
  templateUrl: './tramite-ticket.page.html',
  styleUrls: ['./tramite-ticket.page.scss'],
})
export class TramiteTicketPage implements OnInit {

  codigo;
  statusPhotos:boolean=false;
  
  constructor(private route:ActivatedRoute,
              private modalCtrl:ModalController) { }

  ngOnInit() {
    this.codigo = this.route.snapshot.paramMap.get('codigo');
  }

  async mostrarModal(codigo){
    const modal = await this.modalCtrl.create({
      component: StatusModalComponent,
      componentProps:{
        codigo:codigo
      },
      cssClass:'modal-status',
      backdropDismiss:false
    });

    await modal.present();
  }

}
