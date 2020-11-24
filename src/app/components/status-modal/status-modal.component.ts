import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from '../../services/data/data.service';
import { ToastService } from '../../services/toast/toast.service';
import { AlertService } from '../../services/alert/alert.service';
import { LoadingService } from '../../services/loading/loading.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-status-modal',
  templateUrl: './status-modal.component.html',
  styleUrls: ['./status-modal.component.scss'],
})
export class StatusModalComponent implements OnInit {

  statusOptions;

  @Input() code;
  @Input() userDomain;
  @Input() user;

  statusForm:FormGroup;

  constructor(private modalCtrl:ModalController,
              private dataService:DataService,
              private toastService:ToastService,
              private alertService:AlertService,
              private loadingService:LoadingService) { 
                this.statusForm = this.createFormGroup();
              }

  ngOnInit() {
    this.dataService.getAllStatus(this.userDomain).subscribe((res:any)=>{
      this.statusOptions = res.data;
    });

    this.statusForm.controls['userProcess'].setValue(this.user);
  }

  createFormGroup(){
    return new FormGroup({
      statusCode: new FormControl('', [Validators.required]),
      userProcess: new FormControl({value: '', disabled: true}, [Validators.required]),
      description: new FormControl('')
    });
  }

  get statusCode(){ return this.statusForm.get('statusCode');}
  get userProcess(){ return this.statusForm.get('userProcess');}
  get description(){ return this.statusForm.get('description');}

  closeModal(){
    this.modalCtrl.dismiss();
  }

  saveStatus(){
    this.dataService.changeStatus(this.userDomain,this.code,this.statusForm.value.statusCode,this.statusForm.value.description).subscribe(async (res:any)=>{
      if(!res.status){
        this.toastService.presentToast(res.message, 'danger');
      }else if(res.status){
        
        //Retornar el nuevo status a la vista de "Tramitar Ticket"
        let option:any = this.statusOptions.find(item => item.status==this.statusForm.value.statusCode);
        this.modalCtrl.dismiss({
          status:option.nombre
        });
        
        this.alertService.presentAlert(res.message);
        
      }else{
        this.toastService.presentToast('Ha ocurrido un error desconocido. Intente de nuevo.', 'danger');
      }
    });
  }
}
