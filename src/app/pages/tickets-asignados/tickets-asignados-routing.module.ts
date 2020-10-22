import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TicketsAsignadosPage } from './tickets-asignados.page';

const routes: Routes = [
  {
    path: '',
    component: TicketsAsignadosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TicketsAsignadosPageRoutingModule {}
