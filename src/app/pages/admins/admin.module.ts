import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule, routedComponents } from './Admin-routing.module';
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

import { AjoutAdminComponent } from './ajout-admin/ajout-admin.component';
import { ModifAdminComponent } from './modif-admin/modif-admin.component';
import { AdminComponent } from './_admin/admin.component';




@NgModule({
  declarations: [AjoutAdminComponent,ModifAdminComponent,AdminComponent,routedComponents],
  imports: [
    
    MatSortModule,
    MatInputModule,
    UiSwitchModule,
    MatPaginatorModule,
    MatDialogModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    MatTableModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    AdminRoutingModule,
    NbToastrModule,
   // NbInputModule
    
    
    ReactiveFormsModule
  ],
  providers: [AdminsService,NbToastrService],
})
export class Admin_Module { }
