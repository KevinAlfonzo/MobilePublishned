import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VentaPageRoutingModule } from './venta-routing.module';

import { VentaPage } from './venta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VentaPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [VentaPage]
})
export class VentaPageModule {}
