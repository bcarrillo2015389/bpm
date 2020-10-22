import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LoadingService } from '../../services/loading/loading.service';

@Component({
  selector: 'app-tickets-grid',
  templateUrl: './tickets-grid.component.html',
  styleUrls: ['./tickets-grid.component.scss'],
})
export class TicketsGridComponent implements OnInit {

  items;


  constructor(private alertCtr:AlertController,
              private loadingService:LoadingService,
              private router:Router) { }

  async ngOnInit() {
    await this.loadingService.presentLoading('Cargando...');
    this.items = [{
      codigo:1010,
      incidente:'Espejos Sucios',
      status:'Reportado',
      prioridad:'Baja',
      categoria:'SGI',
      descripcion: 'Mancha de grasa en el espejo delantero.',
      fecha:'30/09/2020'
    },{
      codigo:1011,
      incidente:'Piso Sucio',
      status:'Reportado',
      prioridad:'Baja',
      categoria:'SGI',
      descripcion: 'Derrame de tinta.',
      fecha:'30/09/2020'
    },{
      codigo:1012,
      incidente:'Vidrio roto',
      status:'Solucionado',
      prioridad:'Alta',
      categoria:'SGI',
      descripcion: 'Agujero de 2cm de radio.',
      fecha:'29/09/2020'
    }];

    this.loadingService.loadingDismiss();
  }

  handleTramiteTicket(codigo){
    this.router.navigateByUrl('tramite-ticket/'+codigo);
  }

  handleCloseTicket(){
    this.presentConfirmAlert('¿Desea cerrar este ticket del listado?, no prodrá ser usada después...');
  }

  async presentConfirmAlert(txtMessage) {
    const alert = await this.alertCtr.create({
      cssClass: 'style-alert',
      header: 'Cerrar ticket',
      message: txtMessage,
      buttons: [
        {
          text: '✔ Aceptar',
          handler: (blah) => {
            console.log('Eliminado');
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

}
