import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-status-modal',
  templateUrl: './status-modal.component.html',
  styleUrls: ['./status-modal.component.scss'],
})
export class StatusModalComponent implements OnInit {

  user='Brian Carrillo';
  description;

  @Input() codigo=10;

  constructor(private modalCtrl:ModalController) { }

  ngOnInit() {}

  closeModal(){
    this.modalCtrl.dismiss();
  }

  saveStatus(){
    this.modalCtrl.dismiss();
  }

}
