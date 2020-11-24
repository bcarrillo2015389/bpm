import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInput, PopoverController } from '@ionic/angular';
import { DataService } from '../../services/data/data.service';
import { Storage } from '@ionic/storage';
import { PopoverLoginComponent } from '../../components/popover-login/popover-login.component';
import { UserModel } from '../../models/user.model';
import { ToastService } from '../../services/toast/toast.service';
import { LoadingService } from '../../services/loading/loading.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('userInput') userInput:IonInput;
  @ViewChild('passwordInput') passwordInput:IonInput;

  showPassword:boolean=false;
  passwordToggleIcon="eye-off-outline";
  token:UserModel;

  loginForm: FormGroup;

  constructor(private popoverCtrl:PopoverController, 
              private router: Router,
              private dataService:DataService,
              private storage:Storage,
              private toastService:ToastService,
              private loadingService:LoadingService) { 
                this.loginForm = this.createFormGroup();
              }

  ngOnInit() {
  }

  createFormGroup(){
    return new FormGroup({
      user: new FormControl('',[Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  get user() {return this.loginForm.get('user');}
  get password() {return this.loginForm.get('password');}

  async togglePassword(){
    //Enfoca el cursor en el Input de User
    this.userInput.setFocus();

    //Cambia el type del Input y el icono "eye"
    this.showPassword=!this.showPassword;
    await this.showPassword ? this.passwordToggleIcon="eye-outline":this.passwordToggleIcon="eye-off-outline";

    //Regresa el enfoque del cursor al Input de Password
    this.passwordInput.setFocus();
  }

  userLogin(){
    this.dataService.handleLogin(this.loginForm.value.user, this.loginForm.value.password).subscribe( async (res:any)=>{
      if(!res.status){
        this.toastService.presentToast(res.message, 'danger');
      }else if(res.status){
        await this.loadingService.presentLoading('Iniciando sesión...');

        //Limpiar los inputs
        this.loginForm.reset();
        
        //Almecanar token en Storage
        this.token = new UserModel(res.data.codigo, res.data.nombre, res.data.rol, res.data.sedes_in, res.data.categorias_in, res.data.dominio);
        this.storage.set('token',this.token);

        //Enrutamiento a home
        this.router.navigateByUrl('home');
        this.loadingService.loadingDismiss();
      
        
      }else{
        this.toastService.presentToast('Ha ocurrido un error desconocido. Intente de nuevo.', 'danger');
      }
    });
  }

  async presentPopover(ev:any){
    const popover = await this.popoverCtrl.create({
      component: PopoverLoginComponent,
      cssClass:'popover-item',
      event: ev,
      translucent: true,
      backdropDismiss:true
    });
    await popover.present();

    const {data}= await popover.onWillDismiss();
    if(data){
      this.router.navigateByUrl(data.item);
    }
  }
}
