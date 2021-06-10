import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbAuthJWTToken, NbAuthModule, NbDummyAuthStrategy, NbPasswordAuthStrategy } from '@nebular/auth';
import { NbSecurityModule, NbRoleProvider } from '@nebular/security';
import { of as observableOf } from 'rxjs';

import { throwIfAlreadyLoaded } from './module-import-guard';
import {
  AnalyticsService,
  LayoutService,
} from './utils';
import { UserData } from './data/users';
import { UserService } from './mock/users.service';
import { MockDataModule } from './mock/mock-data.module';
import { environment } from '../../environments/environment';
import { isNull } from 'util';

//provicional
let settings = JSON.parse(localStorage.getItem('settings-ip'));
if (isNull(settings)) settings = { ip: '192.168.1.1', port: '3000' };
console.log('setting on Core.module ', settings);


const DATA_SERVICES = [
  { provide: UserData, useClass: UserService },
];

export class NbSimpleRoleProvider extends NbRoleProvider {
  getRole() {
    // here you could provide any role based on any auth flow
    return observableOf('guest');
  }
}

export const NB_CORE_PROVIDERS = [
  ...MockDataModule.forRoot().providers,
  ...DATA_SERVICES,
  ...NbAuthModule.forRoot({

    strategies: [
      NbPasswordAuthStrategy.setup({
        name: 'email',
        token: {
          key: 'token',
          class: NbAuthJWTToken
        },
        baseEndpoint: environment.URL_API,
        login: {
          endpoint: '/auth/login',
          method: 'post',
          redirect: {
            success: '/pages',
          },
          defaultErrors: ['Algo salió mal. Por favor verifica tu email y contraseña.'],
          defaultMessages: ['Has iniciado sesión correctamente']
        },
        logout: {
          endpoint: '/auth/logout',
          redirect: {
            success: '/'
          },
          defaultErrors: ['Algo salió mal. Por favor vuelva a intertarlo más tarde.'],
          defaultMessages: ['Bye Bye']
        },
        register: {
          endpoint: '/auth/register',
          method: 'post',
          redirect: {
            success: '/'
          },
          defaultErrors: ['Algo salió mal. Por favor vuelva a intertarlo más tarde.'],
          defaultMessages: ['¡Registro exitoso!']
        },
        requestPass: {
          endpoint: '/auth/request-pass',
          method: 'post',
          redirect: {
            success: '/auth/reset-password'
          },
          defaultErrors: ['Algo salió mal. Por favor vuelva a intertarlo más tarde.'],
          defaultMessages: ['Se ha enviado el correo, favor de revisar tu bandeja de entrada']
        },
        resetPass: {
          endpoint: '/auth/reset-pass',
          method: 'post',
          redirect: {
            success: '/'
          },
          defaultErrors: ['Algo salió mal. Por favor vuelva a intertarlo más tarde.'],
        },
      }),
    ],



    forms: {
      login: {
        redirectDelay: 100,
        showMessages: {
          success: true,
          error: true
        }
      },
      register: {
        redirectDelay: 100,
        showMessages: {
          success: true,
          error: true
        }
      },
      logout :{
        redirectDelay: 0,
        showMessages: {
          success: true,
          error: true
        }
      },
    },
  }).providers,

  NbSecurityModule.forRoot({
    accessControl: {
      guest: {
        view: '*',
      },
      user: {
        parent: 'guest',
        create: '*',
        edit: '*',
        remove: '*',
      },
    },
  }).providers,

  {
    provide: NbRoleProvider, useClass: NbSimpleRoleProvider,
  },
  AnalyticsService,
  LayoutService,
];

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    NbAuthModule,
  ],
  declarations: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        ...NB_CORE_PROVIDERS,
      ],
    };
  }
}
