import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data/data.service';
import { ToastService } from '../../services/toast/toast.service';
import { AlertService } from '../../services/alert/alert.service';
import { LoadingService } from '../../services/loading/loading.service';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.page.html',
  styleUrls: ['./recuperar-password.page.scss'],
})
export class RecuperarPasswordPage implements OnInit {
  
  email;

  constructor(private dataService:DataService, 
              private toastService:ToastService,
              private alertService: AlertService,
              private loadingService:LoadingService) { }

  ngOnInit() {
  }

  recoverPassword(){
    if(this.email){
      this.dataService.handleRecoverPassword(this.email).subscribe( async (res:any)=>{
        if(!res.status){
          this.toastService.presentToast(res.message, 'danger');
        }else if(res.status){
          await this.loadingService.presentLoading('Cargando...');

          //Limpiar los inputs
          let inputs = document.getElementsByTagName('ion-input');
          for (let i = 0; i < inputs.length; i++) {
            inputs[i].value='';
          }

          this.loadingService.loadingDismiss();
          this.alertService.presentAlert(res.message);

        }else{
          this.toastService.presentToast('Ha ocurrido un error desconocido. Intente de nuevo.', 'danger');
        }
      });
    }else{
      this.toastService.presentToast('El campo de correo electrónico está incompleto.', 'danger');
    }
  }
}
