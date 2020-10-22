import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContactoAdministradorPageRoutingModule } from './contacto-administrador-routing.module';

import { ContactoAdministradorPage } from './contacto-administrador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContactoAdministradorPageRoutingModule
  ],
  declarations: [ContactoAdministradorPage]
})
export class ContactoAdministradorPageModule {}
