import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminsComponent } from './admin.component';
import { AjoutAdminComponent } from './ajout-admin/ajout-admin.component';


import { ModifAdminComponent } from './modif-admin/modif-admin.component';
import { AdminComponent } from './_admin/admin.component';


const routes: Routes = [
  {
    path: '',
    component: AdminsComponent,
    children: [
      {
        path: 'liste',
        component: AdminComponent,
      },
  
      {
        path: 'ajoutAdmin',
        component: AjoutAdminComponent,
      },
      {
        path: 'modifAdmin',
        component: ModifAdminComponent,
      },
   
  
  
  
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

export const routedComponents = [
    ModifAdminComponent,
    AjoutAdminComponent, 
    AdminComponent
];