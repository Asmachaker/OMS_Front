import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BordereauRoutingModule, routedComponents } from './bordereau-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { NbInputModule, NbMenuModule, NbToastrModule, NbToastrService } from '@nebular/theme';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { ThemeModule } from '../../@theme/theme.module';
import { DashboardModule } from '../dashboard/dashboard.module';


import { AdminsService } from '../../_services/admins.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import {

  NbButtonModule,

} from '@nebular/theme';
import { GetBordereauComponent } from './get-bordereau/get-bordereau.component';
import { BordereauComponent } from './_bordereau/bordereau.component';
import { BordereauService } from "../../_services/bordereau.services"




@NgModule({
  declarations: [GetBordereauComponent,BordereauComponent,routedComponents],
  imports: [
    
    MatSortModule,
    MatInputModule,
    UiSwitchModule,
    MatPaginatorModule,
    MatDialogModule,
    ThemeModule,
    NbMenuModule,
    MatTableModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
   // NbButtonModule,
    BordereauRoutingModule,
    NbToastrModule,
   // NbInputModule
    
    
    ReactiveFormsModule
  ],
  providers: [BordereauService,NbToastrService],
})
export class Bordereau_Module { }
