import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PlanningComponent } from './planning/planning.component';
import { BookingComponent } from './booking/booking.component';
import { ZoneComponent } from './zone/zone.component';
import { TarifComponent } from './tarif/tarif.component';

import { BordereauComponent } from './bordereau/bordereau.component';
import { FactureComponent } from './facture/facture.component';
import { FactureAvoirComponent } from './facture-avoir/facture-avoir.component';
import { AdminComponent } from './admins/_admin/admin.component';
import { Role } from '../_models/role';
import { TailleComponent } from './taille/taille.component';



const routess: Routes = [{ path: '',
component: PagesComponent,
children: [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'planning',
    component: PlanningComponent,

  },
  {
    path: 'booking',
    component: BookingComponent,
    
  },
  {
    path: 'client',
    loadChildren: () => import('./clients/client.module')
      .then(m => m.Client_Module),
      
  
  },

  {
    path: 'admin',
    loadChildren: () => import('./admins/admin.module')
      .then(m => m.Admin_Module),
      
  
  },


  {
    path: 'zone',
    component: ZoneComponent
   /*  loadChildren: () => import('./users/users.module')
      .then(m => m.UsersModule), */
    
  },
  {
    path: 'tarif',
   component: TarifComponent

  },
   {
    path: 'taille',
    component:TailleComponent
   
  },
   {
    path: 'bordereau',
    component:  BordereauComponent
 
  },
  {
    path: 'facture',
    component:  FactureComponent
 
  },
  {
    path: 'factureAv',
    component:  FactureAvoirComponent
 
  },

  
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  
],
}];


  
@NgModule({
  imports: [RouterModule.forChild(routess)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
 
}
