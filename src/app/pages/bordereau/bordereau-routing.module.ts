import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { bordereauxComponent } from './bordereau.component';


import { GetBordereauComponent } from './get-bordereau/get-bordereau.component';
import { BordereauComponent } from './_bordereau/bordereau.component';

const routes: Routes = [
  {
    path: '',
    component: bordereauxComponent,
    children: [
      {
        path: 'liste',
        component: BordereauComponent,
      },
  
      {
        path: 'DetailsBordereau',
        component: GetBordereauComponent,
      },

    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BordereauRoutingModule { }

export const routedComponents = [
    GetBordereauComponent,
    BordereauComponent,
  
    
    
];