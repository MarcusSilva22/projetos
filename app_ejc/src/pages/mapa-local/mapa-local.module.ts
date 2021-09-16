import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapaLocalPage } from './mapa-local';

@NgModule({
  declarations: [
    MapaLocalPage,
  ],
  imports: [
    IonicPageModule.forChild(MapaLocalPage),
  ],
})
export class MapaLocalPageModule {}
