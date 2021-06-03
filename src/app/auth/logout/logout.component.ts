import { Component, Inject, OnInit } from '@angular/core';
import {NbLogoutComponent, NbAuthService, NB_AUTH_OPTIONS, NbTokenService } from '@nebular/auth'
import {Router} from '@angular/router'

@Component({
  selector: 'ngx-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class xLogoutComponent extends NbLogoutComponent  implements OnInit {

  constructor(
    protected service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    protected router: Router,
    protected tokenService: NbTokenService
  ) {
    super(service, options, router);
  }

  ngOnInit(): void {
    super.ngOnInit();
    localStorage.removeItem('idUser');
    console.log('Logout')
  }
}
