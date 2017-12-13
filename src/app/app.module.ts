import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LandingPage } from '../pages/landing/landing';
import { RegisterPage } from '../pages/register/register';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import {GoogleMaps,GoogleMap,GoogleMapsEvent,GoogleMapOptions,CameraPosition,MarkerOptions,Marker} from '@ionic-native/google-maps';
import { Component } from "@angular/core/";


import { IonicStorageModule } from '@ionic/storage';
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireDatabaseModule} from 'angularfire2/database-deprecated';
import {HttpModule} from "@angular/http";
import {FirebaseServiceProvider} from "../providers/firebase-service/firebase-service";
import {DashboardPage} from '../pages/dashboard/dashboard'

const firebaseConfig = {
    apiKey: "AIzaSyDXY9oNoTNEFfb49T8Hp9S_iSYza3kHkMg",
    authDomain: "snitchs-13084.firebaseapp.com",
    databaseURL: "https://snitches-13084.firebaseio.com",
    projectId: "snitches-13084",
    storageBucket: "snitches-13084.appspot.com",
    messagingSenderId: "370771127442"
  };

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    LandingPage,
    HomePage,
    TabsPage,
    RegisterPage,
    DashboardPage

  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireAuthModule,
    HttpModule,
    AngularFireDatabaseModule
   
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    LandingPage,
    HomePage,
    RegisterPage,
    TabsPage,
    DashboardPage
  ],
  providers: [
    StatusBar,
    
    Camera,
    SplashScreen,
    Geolocation,
    //Component,
    GoogleMaps,
    FirebaseServiceProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
