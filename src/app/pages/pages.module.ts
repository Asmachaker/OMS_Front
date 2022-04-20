import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { PlanningComponent } from './planning/planning.component';
import { BookingComponent } from './booking/booking.component';
import { clientsComponent } from './clients/client.component';
import { TailleComponent } from './taille/taille.component';
import { TarifsComponent } from './tarifs/tarif.component';
import { bordereauxComponent } from './bordereau/bordereau.component';
import { FactureComponent } from './facture/facture.component';
import { FactureAvoirComponent } from './facture-avoir/facture-avoir.component';
import {MatTableModule} from '@angular/material/table';

import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatNativeDateModule} from '@angular/material/core';
import { UiSwitchModule } from 'ngx-toggle-switch';


import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AdminsComponent } from './admins/admin.component';
import { ZoneComponent } from './zone/zone.component';





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
    TarifsComponent,
    bordereauxComponent,
    FactureComponent,
    FactureAvoirComponent,
    ZoneComponent
  ],
})
export class PagesModule {
}
