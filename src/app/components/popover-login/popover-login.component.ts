import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Option } from 'src/app/interfaces/interfaces';
import { DataService } from '../../services/data/data.service';

@Component({
  selector: 'app-popover-login',
  templateUrl: './popover-login.component.html',
  styleUrls: ['./popover-login.component.scss'],
})
export class PopoverLoginComponent implements OnInit {

  options:Observable<Option[]>;

  constructor(private popoverCtrl:PopoverController, private dataService:DataService) { }

  ngOnInit() {
    this.options = this.dataService.getMenuLoginOptions();
  }

  onClick(valor:string){
    this.popoverCtrl.dismiss({item:valor});
  }

}
