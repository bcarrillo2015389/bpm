import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActualizarTicketPage } from './actualizar-ticket.page';

const routes: Routes = [
  {
    path: '',
    component: ActualizarTicketPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActualizarTicketPageRoutingModule {}
