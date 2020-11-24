import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContactoAdministradorPageRoutingModule } from './contacto-administrador-routing.module';

import { ContactoAdministradorPage } from './contacto-administrador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContactoAdministradorPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ContactoAdministradorPage]
})
export class ContactoAdministradorPageModule {}
