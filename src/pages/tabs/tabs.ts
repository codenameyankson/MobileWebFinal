import { Component } from '@angular/core';

import { AboutPage } from '../about/about';

import { HomePage } from '../home/home';

import { LandingPage } from '../landing/landing';

import { RegisterPage } from '../register/register';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
 // tab3Root = LandingPage;
  //tab4Root = RegisterPage;


  

  constructor() {

  }
}
