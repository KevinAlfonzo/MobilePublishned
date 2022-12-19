import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmpleadoSavePage } from './empleado-save.page';

const routes: Routes = [
  {
    path: '',
    component: EmpleadoSavePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmpleadoSavePageRoutingModule {}
