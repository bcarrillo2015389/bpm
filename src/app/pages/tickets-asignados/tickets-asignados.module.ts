import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TicketsAsignadosPageRoutingModule } from './tickets-asignados-routing.module';

import { TicketsAsignadosPage } from './tickets-asignados.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TicketsAsignadosPageRoutingModule,
    ComponentsModule
  ],
  declarations: [TicketsAsignadosPage]
})
export class TicketsAsignadosPageModule {}
