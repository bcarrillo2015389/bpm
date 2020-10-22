import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactoAdministradorPage } from './contacto-administrador.page';

const routes: Routes = [
  {
    path: '',
    component: ContactoAdministradorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactoAdministradorPageRoutingModule {}
