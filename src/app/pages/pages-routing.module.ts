import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PlanningComponent } from './planning/planning.component';
import { BookingComponent } from './booking/booking.component';
import { ZoneComponent } from './zone/zone.component';
import { TarifComponent } from './tarifs/_tarif/tarif.component';

import { BordereauComponent } from './bordereau/_bordereau/bordereau.component';
import { FactureComponent } from './facture/facture.component';
import { FactureAvoirComponent } from './facture-avoir/facture-avoir.component';
import { AdminComponent } from './admins/_admin/admin.component';
import { TailleComponent } from './taille/taille.component';
import { DashboardComponent } from './dashboard/dashboard.component';



const routess: Routes = [{ path: '',
component: PagesComponent,
children: [
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module')
      .then(m => m.DashboardModule),
      
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
    
  },
  {
    path: 'tarif',
    loadChildren: () => import('./tarifs/tarif.module')
      .then(m => m.Tarif_Module),
      
  
  },

   {
    path: 'taille',
    component:TailleComponent
   
  },
   {
    path: 'bordereau',
    loadChildren: () => import('./bordereau/bordereau.module')
      .then(m => m.Bordereau_Module),
 
  },
  {
    path: 'facture',
    component:  FactureComponent
 
  },
  {
    path: 'factureAV',
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
