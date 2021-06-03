import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NbAuthComponent } from '@nebular/auth';
import {xLoginComponent} from './login/login.component'
import {xLogoutComponent} from './logout/logout.component'
import {xRegisterComponent} from './register/register.component'
import {xRequestPasswordComponent} from './request-password/request-password.component'
import {xResetPasswordComponent} from './reset-password/reset-password.component'

export const routes: Routes = [

    {
        path: '',
        component: NbAuthComponent,
        children: [
            {
                path: 'login',
                component: xLoginComponent
            },
            {
                path: 'logout',
                component: xLogoutComponent
            },
            {
                path: 'register',
                component: xRegisterComponent
            },
            {
                path: 'request-password',
                component: xRequestPasswordComponent
            },
            {
                path: 'reset-password/:token',
                component: xResetPasswordComponent
            },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthRoutingModule {}