import { Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';

import { ADMIN_MENU, USER_MENU } from './pages-menu';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent implements OnInit{
  menu :NbMenuItem[]
 ngOnInit(): void {
  if  (localStorage.getItem('role') == "ROLE_ADMIN")
    this.menu =ADMIN_MENU ;
  else this.menu=USER_MENU;
 }

  
 
 
}
