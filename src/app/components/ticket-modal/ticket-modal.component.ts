import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-ticket-modal',
  templateUrl: './ticket-modal.component.html',
  styleUrls: ['./ticket-modal.component.scss'],
})
export class TicketModalComponent implements OnInit {

  statusPhotos:boolean=false;
  @Input() codigo;

  constructor(private modalCtrl:ModalController) { }

  ngOnInit() {}

  return(){
    this.modalCtrl.dismiss();
  }

}
