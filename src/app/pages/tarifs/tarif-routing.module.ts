import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AjoutTarifComponent } from './ajout-tarif/ajout-tarif.component';
import { TarifsComponent } from './tarif.component';
import { ModifTarifComponent } from './modif-tarif/modif-tarif.component';
import { TarifComponent } from './_tarif/tarif.component';

const routes: Routes = [
  {
    path: '',
    component: TarifsComponent,
    children: [
      {
        path: 'liste',
        component: TarifComponent,
      },
  
      {
        path: 'ajoutTarif',
        component: AjoutTarifComponent,
      },
      {
        path: 'modifTarif',
        component: ModifTarifComponent,
      },
   
  
  
  
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TarifRoutingModule { }

export const routedComponents = [
    ModifTarifComponent,
    AjoutTarifComponent,
    TarifComponent,
    
    
];