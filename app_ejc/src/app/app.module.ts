import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule, ErrorHandler } from '@angular/core';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IonicStorageModule } from '@ionic/storage';

import { TimerComponent } from '../components/timer/timer';

import { ConferenceApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { MapPage } from '../pages/map/map';

import { KitEncontroPage } from '../pages/kit-encontro/kit-encontro';
import { MapaLocalPage } from '../pages/mapa-local/mapa-local';
import { MissaPage } from '../pages/missa/missa';
import { OracoesPage } from '../pages/oracoes/oracoes';

import { ConferenceData } from '../providers/conference-data';
import { UserData } from '../providers/user-data';


@NgModule({
  declarations: [
    ConferenceApp,
    AboutPage,
    KitEncontroPage,
    MapaLocalPage,
    MissaPage,
    OracoesPage,
    MapPage,
    TimerComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(ConferenceApp, {}, {
      links: [
        { component: AboutPage, name: 'About', segment: 'about' },
        { component: MapPage, name: 'Map', segment: 'map' },
        { component: KitEncontroPage, name: 'KitEncontro', segment: 'kitencontro' }
      ]
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ConferenceApp,
    AboutPage,
    KitEncontroPage,
    MapaLocalPage,
    MissaPage,
    OracoesPage,
    MapPage
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ConferenceData,
    UserData,
    InAppBrowser,
    SplashScreen
  ]
})
export class AppModule { }
