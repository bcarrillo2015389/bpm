import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { PopoverHomeComponent } from './popover-home/popover-home.component';
import { PopoverLoginComponent } from './popover-login/popover-login.component';
import { TicketsGridComponent } from './tickets-grid/tickets-grid.component';
import { TicketModalComponent } from './ticket-modal/ticket-modal.component';
import { StatusModalComponent } from './status-modal/status-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PopoverLoginComponent,
    PopoverHomeComponent,
    TicketsGridComponent,
    TicketModalComponent,
    StatusModalComponent
  ],
  exports: [
    PopoverLoginComponent,
    PopoverHomeComponent,
    TicketsGridComponent,
    TicketModalComponent,
    StatusModalComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ComponentsModule { }
