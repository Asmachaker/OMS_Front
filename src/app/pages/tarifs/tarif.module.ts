import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TarifRoutingModule, routedComponents } from './tarif-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { NbInputModule, NbMenuModule, NbToastrModule, NbToastrService } from '@nebular/theme';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { ThemeModule } from '../../@theme/theme.module';
import { DashboardModule } from '../dashboard/dashboard.module';


import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import {

  NbButtonModule,

} from '@nebular/theme';

import { AjoutTarifComponent } from './ajout-tarif/ajout-tarif.component';
import { ModifTarifComponent } from './modif-tarif/modif-tarif.component';
import { TarifComponent } from './_tarif/tarif.component';
import { TarifService } from '../../_services/tarif.service';




@NgModule({
  declarations: [AjoutTarifComponent,ModifTarifComponent,TarifComponent,routedComponents],
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
    TarifRoutingModule,
    NbToastrModule,
   // NbInputModule
    
    
    ReactiveFormsModule
  ],
  providers: [TarifService,NbToastrService],
})
export class Tarif_Module { }
