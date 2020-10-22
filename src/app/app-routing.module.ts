import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'contacto-administrador',
    loadChildren: () => import('./pages/contacto-administrador/contacto-administrador.module').then( m => m.ContactoAdministradorPageModule)
  },
  {
    path: 'recuperar-password',
    loadChildren: () => import('./pages/recuperar-password/recuperar-password.module').then( m => m.RecuperarPasswordPageModule)
  },
  {
    path: 'nuevo-ticket',
    loadChildren: () => import('./pages/nuevo-ticket/nuevo-ticket.module').then( m => m.NuevoTicketPageModule)
  },
  {
    path: 'tickets',
    loadChildren: () => import('./pages/tickets/tickets.module').then( m => m.TicketsPageModule)
  },
  {
    path: 'tickets-asignados',
    loadChildren: () => import('./pages/tickets-asignados/tickets-asignados.module').then( m => m.TicketsAsignadosPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'password',
    loadChildren: () => import('./pages/password/password.module').then( m => m.PasswordPageModule)
  },
  {
    path: 'tramite-ticket/:codigo',
    loadChildren: () => import('./pages/tramite-ticket/tramite-ticket.module').then( m => m.TramiteTicketPageModule)
  },
  {
    path: 'actualizar-ticket',
    loadChildren: () => import('./pages/actualizar-ticket/actualizar-ticket.module').then( m => m.ActualizarTicketPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
