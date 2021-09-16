import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DietaPage } from './dieta';

@NgModule({
  declarations: [
    DietaPage,
  ],
  imports: [
    IonicPageModule.forChild(DietaPage),
  ],
  exports: [
    DietaPage
  ]
})
export class DietaPageModule {}
