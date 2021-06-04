import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';
import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { AddRegistroModule } from './add-registro/add-registro.module';
import {FormsModule} from '@angular/forms'


@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    AddRegistroModule,
    FormsModule,

  ],
  declarations: [
    PagesComponent,

  ],
})
export class PagesModule {
}
