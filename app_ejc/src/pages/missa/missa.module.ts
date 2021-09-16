import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MissaPage } from './missa';

@NgModule({
  declarations: [
    MissaPage,
  ],
  imports: [
    IonicPageModule.forChild(MissaPage),
  ],
})
export class MissaPageModule {}
