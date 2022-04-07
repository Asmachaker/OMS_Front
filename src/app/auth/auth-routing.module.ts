import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NbAuthComponent } from '@nebular/auth';
import { ActivateAccountComponent } from './activate-account/activate-account.component';
import { AuthComponent } from './auth.component';
import { EmailMdpComponent } from './email-mdp/email-mdp.component';

import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SigninComponent } from './signin/signin.component';

export const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        component: SigninComponent,
      },

      {
        path: 'reset-password/:username',
        component: ResetPasswordComponent,

      },

      {
        path: 'activate/:username',
        component: ActivateAccountComponent,

      },
      {
        path: 'email',
        component: EmailMdpComponent,

      },
     
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {
}

export const routedComponents = [
  SigninComponent,
  ResetPasswordComponent,
  ActivateAccountComponent,
  EmailMdpComponent,
];
