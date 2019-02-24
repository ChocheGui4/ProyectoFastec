import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PuntoInicialPage } from './punto-inicial';

@NgModule({
  declarations: [
    PuntoInicialPage,
  ],
  imports: [
    IonicPageModule.forChild(PuntoInicialPage),
  ],
})
export class PuntoInicialPageModule {}
