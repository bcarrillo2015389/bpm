import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TramiteTicketPageRoutingModule } from './tramite-ticket-routing.module';

import { TramiteTicketPage } from './tramite-ticket.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TramiteTicketPageRoutingModule,
    ComponentsModule
  ],
  declarations: [TramiteTicketPage]
})
export class TramiteTicketPageModule {}
