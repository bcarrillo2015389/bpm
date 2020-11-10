import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, PopoverController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { PopoverHomeComponent } from '../../components/popover-home/popover-home.component';
import { LoadingService } from '../../services/loading/loading.service';
import { DataService } from '../../services/data/data.service';
import { ToastService } from '../../services/toast/toast.service';
import { AlertService } from '../../services/alert/alert.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  code;
  domain;
  items;

  status:boolean=true;

  constructor(private router: Router, 
              private storage:Storage,
              private popoverCtrl:PopoverController,
              private loadingService:LoadingService,
              private dataService:DataService,
              private toastService:ToastService,
              private alertService:AlertService) { }

  ngOnInit() {
  }

  async ionViewWillEnter(){
    await this.loadingService.presentLoading('Cargando...');
    
    await this.storage.get('token').then(
      async user => {
        this.code = user.codigo;
        this.domain = user.dominio;

        await this.dataService.getAssignedTickets(this.domain, this.code).subscribe((res:any)=>{

          this.status = res.status;
          this.items = res.data;
          
          this.loadingService.loadingDismiss();
        });
      }
    );
  }

  newTicket(){
    this.router.navigateByUrl('nuevo-ticket');
  }

  assignedTickets(){
    this.router.navigateByUrl('tickets-asignados');
  }

  tickets(){
    this.router.navigateByUrl('tickets');
  }

  async presentPopover(ev:any){
    const popover = await this.popoverCtrl.create({
      component: PopoverHomeComponent,
      cssClass:'popover-item',
      event: ev,
      translucent: true,
      backdropDismiss:true
    });
    await popover.present();

    const {data}= await popover.onWillDismiss();

    if(data){
      this.router.navigateByUrl(data.item);

      if(data.item == 'login'){
        await this.loadingService.presentLoading('Cerrando sesión...');
        this.storage.remove('token');
        this.loadingService.loadingDismiss();
      }
      
    }
  }

  closeAssignedTicket(code){
    this.dataService.closeTicket(this.domain, code).subscribe(async (res:any)=>{
      if(!res.status){
        this.toastService.presentToast(res.message, 'danger');
      }else if(res.status){
        
        await this.alertService.presentAlert(res.message);
        this.ionViewWillEnter();

      }else{
        this.toastService.presentToast('Ha ocurrido un error desconocido. Intente de nuevo.', 'danger');
      }
    });
  }
}
