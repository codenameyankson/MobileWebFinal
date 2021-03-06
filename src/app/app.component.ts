import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {LandingPage} from '../pages/landing/landing';
import { TabsPage } from '../pages/tabs/tabs';
import {DashboardPage} from '../pages/dashboard/dashboard'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage:any = LandingPage;
 

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
    
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
