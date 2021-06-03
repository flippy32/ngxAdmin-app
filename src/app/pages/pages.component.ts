import { Component } from '@angular/core';
import { MENU_ITEMS } from './pages-menu';
import {NbAuthService, NbAuthJWTToken} from '@nebular/auth'
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs'

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
export class PagesComponent {

  menu = MENU_ITEMS;
  //menu: any = {}
  private user: any = {};
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private authService: NbAuthService) {
    this.authService.onTokenChange()
    .pipe(takeUntil(this.destroy$))
    .subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
        this.user = token.getPayload();
      }
    }) 
  }
}
