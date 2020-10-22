import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActualizarTicketPageRoutingModule } from './actualizar-ticket-routing.module';

import { ActualizarTicketPage } from './actualizar-ticket.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActualizarTicketPageRoutingModule
  ],
  declarations: [ActualizarTicketPage]
})
export class ActualizarTicketPageModule {}
