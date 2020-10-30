import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-ticket-modal',
  templateUrl: './ticket-modal.component.html',
  styleUrls: ['./ticket-modal.component.scss'],
})
export class TicketModalComponent implements OnInit {

  statusPhotos:boolean=false;
  @Input() code;
  item:any={};

  constructor(private modalCtrl:ModalController,
              private storage:Storage) { }

  ngOnInit() {
    this.storage.get('reportedTicket').then(
      item => {
        this.item = item;
    });
  }

  return(){
    this.modalCtrl.dismiss();
  }

}
