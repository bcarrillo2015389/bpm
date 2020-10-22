import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, PopoverController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { PopoverHomeComponent } from '../../components/popover-home/popover-home.component';
import { LoadingService } from '../../services/loading/loading.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private router: Router, 
              private storage:Storage,
              private popoverCtrl:PopoverController,
              private loadingService:LoadingService) { }

  ngOnInit() {
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

}
