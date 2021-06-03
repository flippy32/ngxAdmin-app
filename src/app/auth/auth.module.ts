import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AuthRoutingModule } from './auth-routing.module';
import { NbAuthModule } from '@nebular/auth';
import {
    NbAlertModule,
    NbButtonModule,
    NbCheckboxModule,
    NbIconModule,
    NbInputModule
} from '@nebular/theme';
import { xLoginComponent } from './login/login.component';
import { xLogoutComponent } from './logout/logout.component';
import { xRegisterComponent } from './register/register.component';
import { xResetPasswordComponent } from './reset-password/reset-password.component';
import { xRequestPasswordComponent } from './request-password/request-password.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        NbAlertModule,
        NbInputModule,
        NbButtonModule,
        NbCheckboxModule,
        AuthRoutingModule,
        NbAuthModule,
        NbIconModule
    ],
    declarations: [
        // ... here goes our new components
        xLoginComponent,
        xLogoutComponent,
        xRegisterComponent,
        xResetPasswordComponent,
        xRequestPasswordComponent
    ],
})
export class NgxAuthModule {
}
