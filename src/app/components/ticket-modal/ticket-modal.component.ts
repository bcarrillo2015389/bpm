import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { LoadingService } from '../../services/loading/loading.service';
import { DataService } from '../../services/data/data.service';

@Component({
  selector: 'app-ticket-modal',
  templateUrl: './ticket-modal.component.html',
  styleUrls: ['./ticket-modal.component.scss'],
})
export class TicketModalComponent implements OnInit {

  statusPhotos:boolean=false;
  @Input() code;
  item:any={};

  userDomain;
  userCode;

  assignedUsers;
  binnacle;

  constructor(private modalCtrl:ModalController,
              private storage:Storage,
              private loadingService:LoadingService,
              private dataService:DataService) { }

  async ngOnInit() {
    await this.loadingService.presentLoading('Cargando...');

    await this.storage.get('token').then(
      async user => {
        this.userDomain = user.dominio;
        this. userCode = user.codigo;
        let sedes = user.sedes;

        await this.dataService.getReportedTickets(this.userDomain, this.userCode).subscribe((res:any)=>{
          this.item = res.data.find(item=>item.codigo==this.code);
          this.assignedUsers = this.item.usuarios_asignados;
          this.binnacle=this.item.bitacora;

          this.loadingService.loadingDismiss();
        });
      }
    );
  }

  return(){
    this.modalCtrl.dismiss();
  }

}
