import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data/data.service';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
import { ToastService } from '../../services/toast/toast.service';
import { AlertService } from '../../services/alert/alert.service';
import { LoadingService } from '../../services/loading/loading.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})
export class PasswordPage implements OnInit {

  code;
  name;
  user;

  password;
  confirmPassword;
  statusIcon1;
  statusIcon2;
  status1;
  status2;

  securityPassword=0;
  passwordStatus='primary';



  constructor(private dataService:DataService,
              private storage:Storage,
              private alertCtr:AlertController,
              private toastService:ToastService,
              private alertService:AlertService,
              private loadingService:LoadingService) { }

  async ngOnInit() {
    await this.loadingService.presentLoading('Cargando...');

    await this.storage.get('token').then(
      async user => {
        this.code = user.codigo;

        await this.dataService.getPasswordData(this.code).subscribe((res:any)=>{
          this.name=res.data.nombre;
          this.user=res.data.usu;
          this.password=undefined;
          this.confirmPassword=undefined;
          this.loadingService.loadingDismiss();
        });
      }
    );

    this.statusIcon1='ellipsis-horizontal';
    this.statusIcon2='ellipsis-horizontal';
    this.status1='light';
    this.status2='light';
  }


  updatePassword(){
    if(this.name && this.user && this.password && this.confirmPassword){
      if(this.password!=this.confirmPassword){
        this.toastService.presentToast('Los contraseña y la confirmación de la misma no concuerdan. Intente nuevamente.', 'danger');
      }else{
        this.dataService.setPasswordData(this.code, this.user, this.password).subscribe(async (res:any)=>{
          if(!res.status){
            this.toastService.presentToast(res.message, 'danger');
          }else if(res.status){            
            //Limpiar inputs
            await this.ngOnInit();

            this.alertService.presentAlert(res.message);
          }else{
            this.toastService.presentToast('Ha ocurrido un error desconocido. Intente de nuevo.', 'danger');
          }
        })
      }
    }else{
      this.toastService.presentToast('Los campos necesarios no están completos.', 'danger');
    }
  }

  cleanInputs(){
    let txtMessage = '¿Desea Limpiar la página?, si aún no a grabado perdera los datos escritos...'
    this.presentConfirmAlert(txtMessage);
  }

  async presentConfirmAlert(txtMessage) {
    const alert = await this.alertCtr.create({
      cssClass: 'style-alert',
      header: 'Limpiar',
      message: txtMessage,
      buttons: [
        {
          text: '✔ Aceptar',
          handler: (blah) => {
            this.ngOnInit();
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

  changePassword(event){
    if(event==''){
      this.statusIcon1='ellipsis-horizontal';
      this.status1='light';
    }else{
      if(this.statusIcon1=='ellipsis-horizontal'){
        this.statusIcon1='checkmark-circle';
        this.status1='success';
      }
    }

    if(this.confirmPassword !=undefined && this.confirmPassword!='' && event !=this.confirmPassword){
      this.statusIcon2='close-circle';
      this.status2='danger';
    }else if(this.confirmPassword !=undefined && this.confirmPassword!='' && event==this.confirmPassword){
      this.statusIcon2='checkmark-circle';
      this.status2='success';
    }

    this.securityPassword = this.passwordStrength(event);

    if(this.securityPassword==0){
      this.passwordStatus='primary';
    }else if(this.securityPassword>0 && this.securityPassword<=35){
      this.passwordStatus='danger';
    }else if(this.securityPassword>35 && this.securityPassword<=70){
      this.passwordStatus='warning';
    }else if(this.securityPassword>70){
      this.passwordStatus='success';
    }
  }

  changeConfirmPassword(event){
    if(event==''){
      this.statusIcon2='ellipsis-horizontal';
      this.status2='light';
    }else{
      if(event!=this.password){
        this.statusIcon2='close-circle';
        this.status2='danger';
      }else{
        this.statusIcon2='checkmark-circle';
        this.status2='success';
      }
    }
  }

  passwordStrength(clave){
		var seguridad = 0;
		if(clave.length!=0){
			if (this.contentNumbers(clave) && this.contentLetters(clave)){
				  seguridad += 30;
			}
			if (this.contentLowerCase(clave) && this.contentUpperCase(clave)){
				  seguridad += 30;
			}
			if (clave.length >= 4 && clave.length <= 5){
				  seguridad += 10;
			}else{
				if (clave.length >= 6 && clave.length <= 8){
					  seguridad += 30;
				}else{
					if (clave.length > 8){
						seguridad += 40;
					}
				}
			}
		}
		return seguridad;           
  }
  
  contentNumbers(clave):boolean{
    const regex = /\d/;
    return regex.test(clave);
  }

  contentLetters(clave):boolean{
    const regex = /[A-Z]|[a-z]|[Á-Ú]|[á-ú]/;
    return regex.test(clave);
  }

	contentLowerCase(clave){
    const regex = /[a-z]|[á-ú]/;
    return regex.test(clave);
  }

  contentUpperCase(clave){
    const regex = /[A-Z]|[Á-Ú]/;
    return regex.test(clave);
  }

}
