import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { StatusModalComponent } from '../../components/status-modal/status-modal.component';
import { Storage } from '@ionic/storage';
import { DataService } from '../../services/data/data.service';
import { ToastService } from '../../services/toast/toast.service';
import { LoadingService } from '../../services/loading/loading.service';
import { AlertService } from '../../services/alert/alert.service';

@Component({
  selector: 'app-tramite-ticket',
  templateUrl: './tramite-ticket.page.html',
  styleUrls: ['./tramite-ticket.page.scss'],
})
export class TramiteTicketPage implements OnInit {

  item:any={};
  code;
  statusPhotos:boolean=false;

  userDomain;
  userName;
  userCode;

  assignedUsers;
  newUserCode;

  aviableUsers;

  binnacle;

  constructor(private route:ActivatedRoute,
              private modalCtrl:ModalController,
              private router:Router,
              private storage:Storage,
              private dataService:DataService,
              private toastService:ToastService,
              private loadingService:LoadingService,
              private alertService:AlertService) { }

  async ngOnInit() {
    await this.loadingService.presentLoading('Cargando...');
    this.code = this.route.snapshot.paramMap.get('codigo');

    await this.storage.get('token').then(
      async user => {
        this.userDomain = user.dominio;
        this.userName = user.nombre;
        this. userCode = user.codigo;
        let sedes = user.sedes;

        await this.dataService.getAssignedTickets(this.userDomain, this.userCode).subscribe((res:any)=>{
          this.item = res.data.find(item=>item.codigo==this.code);
          this.assignedUsers = this.item.usuarios_asignados;
          this.binnacle=this.item.bitacora;
        });

        await this.dataService.getUsers(this.userDomain,sedes).subscribe((res:any)=>{
          this.aviableUsers = res.data;
          
          //Eliminación de objetos repetidos
          var hash = {};
          this.aviableUsers = this.aviableUsers.filter(function(current) {
            var exists = !hash[current.codigo];
            hash[current.codigo] = true;
            return exists;
          });

          this.loadingService.loadingDismiss();
        });
      }
    );
  }

  async mostrarModal(){
    const modal = await this.modalCtrl.create({
      component: StatusModalComponent,
      componentProps:{
        code:this.code,
        userDomain:this.userDomain,
        user:this.userName
      },
      cssClass:'modal-status',
      backdropDismiss:false
    });

    await modal.present();

    const {data} = await modal.onWillDismiss();

    if(data){
      this.item.status = data.status;
    }
  }

  handleTicketUpdate(){
    this.router.navigateByUrl('actualizar-ticket/'+this.code);
  }

  getOut(userCode){
    this.dataService.getOutUser(this.userDomain,this.code, userCode).subscribe(async (res:any)=>{
      if(!res.status){
        this.toastService.presentToast(res.message, 'danger');
      }else if(res.status){

        if(userCode==this.userCode){
          this.router.navigateByUrl('home');
        }else{
          await this.ngOnInit();
        }
        
        this.alertService.presentAlert(res.message);
      }else{
        this.toastService.presentToast('Ha ocurrido un error desconocido. Intente de nuevo.', 'danger');
      }
    });
  }

  addUser(){
    if(this.newUserCode){
      this.dataService.addUser(this.userDomain, this.code, this.newUserCode).subscribe(async (res:any)=>{
        if(!res.status){
          this.toastService.presentToast(res.message, 'danger');
        }else if(res.status){            
          //Recargar
          this.newUserCode=undefined;
          await this.ngOnInit();
          this.alertService.presentAlert(res.message);
          
        }else{
          this.toastService.presentToast('Ha ocurrido un error desconocido. Intente de nuevo.', 'danger');
        }
      });
    }else{
      this.toastService.presentToast('Debe llenar los Campos Obligatorios...', 'danger');
    }
  }

  transferUser(){
    if(this.newUserCode){
      this.dataService.transferUser(this.userDomain, this.code, this.newUserCode).subscribe(async (res:any)=>{
        if(!res.status){
          this.toastService.presentToast(res.message, 'danger');
        }else if(res.status){            
          
          if(this.newUserCode!=this.userCode){
            this.router.navigateByUrl('home');
          }else{
            this.newUserCode=undefined;
            await this.ngOnInit();
          }

          this.alertService.presentAlert(res.message);
          
        }else{
          this.toastService.presentToast('Ha ocurrido un error desconocido. Intente de nuevo.', 'danger');
        }
      });
    }else{
      this.toastService.presentToast('Debe llenar los Campos Obligatorios...', 'danger');
    }
  }

}
