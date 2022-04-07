import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { PlanningComponent } from './planning/planning.component';
import { BookingComponent } from './booking/booking.component';
import { clientsComponent } from './clients/client.component';
import { TailleComponent } from './taille/taille.component';
import { TarifComponent } from './tarif/tarif.component';
import { BordereauComponent } from './bordereau/bordereau.component';
import { FactureComponent } from './facture/facture.component';
import { FactureAvoirComponent } from './facture-avoir/facture-avoir.component';
import {MatTableModule} from '@angular/material/table';

import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatNativeDateModule} from '@angular/material/core';
import { UiSwitchModule } from 'ngx-toggle-switch';

import { AjoutAdminComponent } from './admins/ajout-admin/ajout-admin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModifAdminComponent } from './admins/modif-admin/modif-admin.component';
import { RouterModule } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AdminComponent } from './admins/_admin/admin.component';
import { Admin_Module } from './admins/admin.module';
import { AdminsComponent } from './admins/admin.component';




@NgModule({
  imports: [
    
    UiSwitchModule,
    MatDialogModule,
    MatPaginatorModule,
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    MatTableModule,
    MatNativeDateModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: 
   [
 
    AdminsComponent,
    PlanningComponent,
    BookingComponent,
    clientsComponent,
    TailleComponent,
    TarifComponent,
    BordereauComponent,
    FactureComponent,
    FactureAvoirComponent,
    

    
  ],
})
export class PagesModule {
}
