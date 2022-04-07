import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthRoutingModule, routedComponents } from './auth-routing.module';
import {
  NbAlertModule,
  NbButtonModule,
  NbCheckboxModule,
  NbInputModule,
  NbIconModule,
  NbCardModule,
  NbToastrService,
  NbToastrModule,
} from '@nebular/theme';




import { SigninComponent } from './Signin/signin.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

import { ThemeModule } from '../@theme/theme.module';
import { ActivateAccountComponent } from './activate-account/activate-account.component';
import { EmailMdpComponent } from './email-mdp/email-mdp.component';
import { AuthService } from '../_services/auth.service';

@NgModule({
  declarations: [
  SigninComponent,
  ResetPasswordComponent,
  ActivateAccountComponent,
  EmailMdpComponent,routedComponents
  
],
  imports: [
    NbToastrModule,
    CommonModule,
    ThemeModule,
    FormsModule, ReactiveFormsModule,
    RouterModule,
    AuthRoutingModule,
   // NbAlertModule,
    NbButtonModule,
    NbCheckboxModule,
  NbInputModule,
  NbIconModule,
  NbCardModule,
  
  ],
  providers: [AuthService,NbToastrService],
})
export class AuthModule { }
