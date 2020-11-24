import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data/data.service';
import { ToastService } from '../../services/toast/toast.service';
import { AlertService } from '../../services/alert/alert.service';
import { LoadingService } from '../../services/loading/loading.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-contacto-administrador',
  templateUrl: './contacto-administrador.page.html',
  styleUrls: ['./contacto-administrador.page.scss'],
})
export class ContactoAdministradorPage implements OnInit {

  contactForm: FormGroup;
  pattern: any = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  constructor(private dataService:DataService, 
              private toastService:ToastService,
              private alertService:AlertService,
              private loadingService:LoadingService) { 
                this.contactForm = this.createFormGroup();
              }

  ngOnInit() {
  }

  createFormGroup(){
    return new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern(this.pattern)]),
      affair: new FormControl('', [Validators.required]),
      message: new FormControl('', [Validators.required])
    });
  }

  get name(){ return this.contactForm.get('name');}
  get email(){ return this.contactForm.get('email');}
  get affair(){ return this.contactForm.get('affair');}
  get message(){ return this.contactForm.get('message');}

  handleContactAdmin(){
    this.dataService.handleContactAdmin(this.contactForm.value.name,this.contactForm.value.email,this.contactForm.value.affair,this.contactForm.value.message).subscribe(async (res:any)=>{
      if(!res.status){
        this.toastService.presentToast(res.message, 'danger');
      }else if(res.status){
        await this.loadingService.presentLoading('Cargando...');

        //Limpiar los inputs
        this.contactForm.reset();
        
        this.loadingService.loadingDismiss();
        this.alertService.presentAlert(res.message);
        
      }else{
        this.toastService.presentToast('Ha ocurrido un error desconocido. Intente de nuevo.', 'danger');
      }
    });
  }

}
