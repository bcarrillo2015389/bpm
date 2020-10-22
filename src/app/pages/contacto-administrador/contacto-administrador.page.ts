import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data/data.service';
import { ToastService } from '../../services/toast/toast.service';
import { AlertService } from '../../services/alert/alert.service';
import { LoadingService } from '../../services/loading/loading.service';

@Component({
  selector: 'app-contacto-administrador',
  templateUrl: './contacto-administrador.page.html',
  styleUrls: ['./contacto-administrador.page.scss'],
})
export class ContactoAdministradorPage implements OnInit {
  name;
  email;
  affair;
  message;
  
  constructor(private dataService:DataService, 
              private toastService:ToastService,
              private alertService:AlertService,
              private loadingService:LoadingService) { }

  ngOnInit() {
  }

  handleContactAdmin(){
    if(this.name && this.email && this.affair && this.message){
      this.dataService.handleContactAdmin(this.name,this.email,this.affair,this.message).subscribe(async (res:any)=>{
        if(!res.status){
          this.toastService.presentToast(res.message, 'danger');
        }else if(res.status){

          await this.loadingService.presentLoading('Cargando...');

          //Limpiar los inputs
          let inputs = document.getElementsByTagName('ion-input');
          for (let i = 0; i < inputs.length; i++) {
            inputs[i].value='';
          }
          (<HTMLInputElement>document.getElementById('areaMensaje')).value = '';
          
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
