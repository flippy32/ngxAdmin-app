import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router'
import {NbResetPasswordComponent, NbAuthService, NB_AUTH_OPTIONS} from '@nebular/auth'

@Component({
  selector: 'ngx-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class xResetPasswordComponent extends NbResetPasswordComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    protected service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    protected cd: ChangeDetectorRef,
    protected router: Router,
  ) { 
    super(service, options, cd, router);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.user.token = params.get('token');
    });
  }
}
