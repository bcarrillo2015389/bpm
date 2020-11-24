import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data/data.service';
import { ToastService } from '../../services/toast/toast.service';
import { AlertService } from '../../services/alert/alert.service';
import { LoadingService } from '../../services/loading/loading.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.page.html',
  styleUrls: ['./recuperar-password.page.scss'],
})
export class RecuperarPasswordPage implements OnInit {
  
  passwordForm: FormGroup;
  pattern: any = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(private dataService:DataService, 
              private toastService:ToastService,
              private alertService: AlertService,
              private loadingService:LoadingService) { 
                this.passwordForm = this.createFormGroup();
              }

  ngOnInit() {
  }

  createFormGroup(){
    return new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(this.pattern)])
    });
  }

  get email(){ return this.passwordForm.get('email');}

  recoverPassword(){
    this.dataService.handleRecoverPassword(this.passwordForm.value.email).subscribe( async (res:any)=>{
      if(!res.status){
        this.toastService.presentToast(res.message, 'danger');
      }else if(res.status){
        await this.loadingService.presentLoading('Cargando...');
        //Limpiar los inputs
        this.passwordForm.reset();
        
        this.loadingService.loadingDismiss();
        this.alertService.presentAlert(res.message);

      }else{
        this.toastService.presentToast('Ha ocurrido un error desconocido. Intente de nuevo.', 'danger');
      }
    });
  }
}
