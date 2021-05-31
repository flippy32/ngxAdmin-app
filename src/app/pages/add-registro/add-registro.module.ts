import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddRegistroComponent } from './add-registro.component';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule, NbIconModule,
  NbInputModule,
  NbOptionModule,
  NbRadioModule,
  NbSelectModule,
  NbUserModule,
} from '@nebular/theme';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AddRegistroComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    NbCardModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    NbSelectModule,
    NbIconModule,
    NbOptionModule,
  ],
  
})
export class AddRegistroModule { }
