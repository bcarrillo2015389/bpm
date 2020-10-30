import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from '../../services/data/data.service';
import { ToastService } from '../../services/toast/toast.service';
import { AlertService } from '../../services/alert/alert.service';
import { LoadingService } from '../../services/loading/loading.service';

@Component({
  selector: 'app-status-modal',
  templateUrl: './status-modal.component.html',
  styleUrls: ['./status-modal.component.scss'],
})
export class StatusModalComponent implements OnInit {

  statusOptions;
  description;
  statusCode;

  @Input() code;
  @Input() userDomain;
  @Input() user;

  constructor(private modalCtrl:ModalController,
              private dataService:DataService,
              private toastService:ToastService,
              private alertService:AlertService,
              private loadingService:LoadingService) { }

  ngOnInit() {
    this.dataService.getAllStatus(this.userDomain).subscribe((res:any)=>{
      this.statusOptions = res.data;
    });
  }

  closeModal(){
    this.modalCtrl.dismiss();
  }

  saveStatus(){
    if(this.statusCode!=undefined){
      this.dataService.changeStatus(this.userDomain,this.code,this.statusCode,this.description).subscribe(async (res:any)=>{
        if(!res.status){
          this.toastService.presentToast(res.message, 'danger');
        }else if(res.status){
          
          await this.loadingService.presentLoading('Cargando...');

          //Retornar el nuevo status a la vista de "Tramitar Ticket"
          let option:any = this.statusOptions.find(item => item.status==this.statusCode);
          this.modalCtrl.dismiss({
            status:option.nombre
          });

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
