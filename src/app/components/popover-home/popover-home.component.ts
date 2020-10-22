import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Option } from '../../interfaces/interfaces';
import { DataService } from '../../services/data/data.service';

@Component({
  selector: 'app-popover-home',
  templateUrl: './popover-home.component.html',
  styleUrls: ['./popover-home.component.scss'],
})
export class PopoverHomeComponent implements OnInit {

  options:Observable<Option[]>;

  constructor(private popoverCtrl:PopoverController, private dataService:DataService) { }

  ngOnInit() {
    this.options = this.dataService.getMenuHomeOptions();
  }

  onClick(valor:string){
    this.popoverCtrl.dismiss({item:valor});
  }

}
