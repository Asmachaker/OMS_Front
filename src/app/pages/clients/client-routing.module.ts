import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AjoutClientComponent } from './ajout-client/ajout-client.component';
import { clientsComponent } from './client.component';
import { ModifClientComponent } from './modif-client/modif-client.component';
import { ClientComponent } from './_client/client.component';

const routes: Routes = [
  {
    path: '',
    component: clientsComponent,
    children: [
      {
        path: 'liste',
        component: ClientComponent,
      },
  
      {
        path: 'ajoutClient',
        component: AjoutClientComponent,
      },
      {
        path: 'modifClient',
        component: ModifClientComponent,
      },
   
  
  
  
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }

export const routedComponents = [
    ModifClientComponent,
    AjoutClientComponent,
    ClientComponent,
    
    
];