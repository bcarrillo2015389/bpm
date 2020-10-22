import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data/data.service';
import { Storage } from '@ionic/storage';
import { ToastService } from '../../services/toast/toast.service';
import { AlertService } from '../../services/alert/alert.service';
import { AlertController } from '@ionic/angular';
import { LoadingService } from '../../services/loading/loading.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
 
  //Foto de perfil
  photo;
  default = '../../../assets/img/nofoto.jpg';

  //Datos
  code;
  principalName;
  name;
  email;
  phone;

  constructor(private dataService: DataService, 
              private storage: Storage,
              private toastService: ToastService,
              private alertService: AlertService,
              private alertCtrl:AlertController,
              private loadingService:LoadingService) { }

  async ngOnInit() {
    await this.loadingService.presentLoading('Cargando...');

    await this.storage.get('token').then(
      async user => {
        this.code=user.codigo;

        await this.dataService.getProfilePhoto(this.code).subscribe((res:any)=>{
          this.photo = res.data.url_foto;
        });

        await this.dataService.getProfileData(user.codigo).subscribe((res:any)=>{
          this.name=res.data.nombre;
          this.principalName=res.data.nombre;
          this.email=res.data.mail;
          this.phone=res.data.telefono;
          this.loadingService.loadingDismiss();
        });
      }
    );
  }

  updateProfile(){
    if(this.name && this.email && this.phone){
      this.dataService.setProfileData(this.code, this.name, this.email, this.phone).subscribe(async (res:any)=>{
        if(!res.status){
          this.toastService.presentToast(res.message, 'danger');
        }else if(res.status){
          await this.loadingService.presentLoading('Cargando...');
          this.principalName = this.name;

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

  takePicture(){
    
  }

  cleanInputs(){
    let txtMessage = '¿Desea Limpiar la página?, si aún no a grabado perdera los datos escritos...'
    this.presentConfirmAlert(txtMessage);
  }

  async presentConfirmAlert(txtMessage) {
    const alert = await this.alertCtrl.create({
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

}
