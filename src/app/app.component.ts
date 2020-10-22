import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Option } from './interfaces/interfaces';
import { DataService } from './services/data/data.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  
  options:Observable<Option[]>;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private router: Router,
    private dataService: DataService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.getStorageUser();
      this.options = this.dataService.getMenuLoginOptions();
    });
  }

  async getStorageUser(){
    await this.storage.get('token').then(
      user => {
        //Redirección según Storage
        user ? this.router.navigateByUrl('home') : this.router.navigateByUrl('login');
      }
    );
  }
}
