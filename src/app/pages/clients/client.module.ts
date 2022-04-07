import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule, routedComponents } from './client-routing.module';
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

import { AjoutClientComponent } from './ajout-client/ajout-client.component';
import { ModifClientComponent } from './modif-client/modif-client.component';
import { ClientComponent } from './_client/client.component';
import { ClientService } from '../../_services/client.service';




@NgModule({
  declarations: [AjoutClientComponent,ModifClientComponent,ClientComponent,routedComponents],
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
   // NbButtonModule,
    ClientRoutingModule,
    NbToastrModule,
   // NbInputModule
    
    
    ReactiveFormsModule
  ],
  providers: [ClientService,NbToastrService],
})
export class Client_Module { }
