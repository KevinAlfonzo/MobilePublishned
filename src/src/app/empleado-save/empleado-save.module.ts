import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmpleadoSavePageRoutingModule } from './empleado-save-routing.module';

import { EmpleadoSavePage } from './empleado-save.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EmpleadoSavePageRoutingModule
  ],
  declarations: [EmpleadoSavePage]
})
export class EmpleadoSavePageModule {}
