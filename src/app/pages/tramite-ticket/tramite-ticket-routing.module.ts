import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TramiteTicketPage } from './tramite-ticket.page';

const routes: Routes = [
  {
    path: '',
    component: TramiteTicketPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TramiteTicketPageRoutingModule {}
