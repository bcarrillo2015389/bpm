import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data/data.service';
import { Storage } from '@ionic/storage';
import { ToastService } from '../../services/toast/toast.service';
import { AlertService } from '../../services/alert/alert.service';
import { AlertController, ActionSheetController } from '@ionic/angular';
import { LoadingService } from '../../services/loading/loading.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PhotoService } from '../../services/photo/photo.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
 
  //Foto de perfil
  photo;
  default = '../../../assets/img/nofoto.jpg';

  profileForm: FormGroup;
  pattern: any = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  //Datos
  code;
  domain;
  principalName;

  constructor(private dataService: DataService, 
              private storage: Storage,
              private toastService: ToastService,
              private alertService: AlertService,
              private alertCtrl:AlertController,
              private loadingService:LoadingService,
              private actionSheetCtrl:ActionSheetController,
              private photoService:PhotoService) { 
                this.profileForm = this.createFormGroup();
              }

  async ngOnInit() {
    await this.loadingService.presentLoading('Cargando...');

    await this.storage.get('token').then(
      async user => {
        this.code=user.codigo;
        this.domain = user.dominio;

        await this.dataService.getProfilePhoto(this.domain, this.code).subscribe((res:any)=>{
          this.photo = res.data.url_foto;
        });

        await this.dataService.getProfileData(this.domain, user.codigo).subscribe((res:any)=>{
          this.profileForm.controls['name'].setValue(res.data.nombre);
          this.principalName=res.data.nombre;
          this.profileForm.controls['email'].setValue(res.data.mail);
          this.profileForm.controls['phone'].setValue(res.data.telefono);
          this.loadingService.loadingDismiss();
        });
      }
    );
  }

  createFormGroup(){
    return new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern(this.pattern)]),
      phone: new FormControl('', [Validators.required])
    });
  }

  get name(){ return this.profileForm.get('name');}
  get email(){ return this.profileForm.get('email');}
  get phone(){ return this.profileForm.get('phone');}

  updateProfile(){
  this.dataService.setProfileData(this.domain, this.code, this.profileForm.value.name, this.profileForm.value.email, this.profileForm.value.phone).subscribe(async (res:any)=>{
    if(!res.status){
      this.toastService.presentToast(res.message, 'danger');
    }else if(res.status){
      await this.loadingService.presentLoading('Cargando...');
      this.principalName = this.profileForm.value.name;

      this.loadingService.loadingDismiss();
      this.alertService.presentAlert(res.message);
      
    }else{
      this.toastService.presentToast('Ha ocurrido un error desconocido. Intente de nuevo.', 'danger');
    }
  });
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Opciones',
      backdropDismiss:true,
      buttons: [
      {
        text: 'Cámara',
        icon: 'camera',
        cssClass:'action-item',
        handler: () => {
          this.takePhoto();
        }
      }, {
        text: 'Galería',
        icon: 'image',
        cssClass:'action-item',
        handler: () => {
          this.getGalleryPhoto();
        }
      }, {
        text: 'Cancelar',
        icon: 'close',
        cssClass:'cancel-item',
        role: 'cancel'
      }]
    });
    await actionSheet.present();
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

  async takePhoto(){
    await this.loadingService.presentLoading('Cargando...');
    let result = await this.photoService.takePhoto();

    const file = this.dataURLtoFile(result.dataUrl, 'perfil.jpg');

    this.dataService.updateProfilePhoto(this.domain, this.code, file).subscribe(async (res:any)=>{
      if(!res.status){
        this.toastService.presentToast(res.message, 'danger');

      }else if(res.status){
        await this.ngOnInit();
        this.alertService.presentAlert(res.message);
        
      }else{
        this.toastService.presentToast('Ha ocurrido un error desconocido. Intente de nuevo.', 'danger');
      }
      
      this.loadingService.loadingDismiss();
    });
  }

  async getGalleryPhoto(){
    await this.loadingService.presentLoading('Cargando...');
    let result = await this.photoService.getGalleryPhoto();

    const file = this.dataURLtoFile(result.dataUrl, 'perfil.jpg');

    this.dataService.updateProfilePhoto(this.domain, this.code, file).subscribe(async (res:any)=>{
      if(!res.status){
        this.toastService.presentToast(res.message, 'danger');

      }else if(res.status){
        await this.ngOnInit();
        this.alertService.presentAlert(res.message);

      }else{
        this.toastService.presentToast('Ha ocurrido un error desconocido. Intente de nuevo.', 'danger');
      }
      
      this.loadingService.loadingDismiss();
    });
  }

  dataURLtoFile(dataurl, filename) {
    // tslint:disable-next-line: one-variable-per-declaration
    let arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type: mime});
}

}
