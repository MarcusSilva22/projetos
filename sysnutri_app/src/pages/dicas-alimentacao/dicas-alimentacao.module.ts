import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DicasAlimentacaoPage } from './dicas-alimentacao';

@NgModule({
  declarations: [
    DicasAlimentacaoPage,
  ],
  imports: [
    IonicPageModule.forChild(DicasAlimentacaoPage),
  ],
  exports: [
    DicasAlimentacaoPage
  ]
})
export class DicasAlimentacaoPageModule {}
