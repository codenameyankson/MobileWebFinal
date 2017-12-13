import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { User } from '../../modules/user';
import {AngularFireAuth} from 'angularfire2/auth';
import {ToastController} from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import {DashboardPage} from '../dashboard/dashboard'

@IonicPage()
@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html',
})
export class LandingPage {
  user = {} as User;
  constructor(private toast:ToastController, public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth) {
  }
  register(){
     console.log('ionViewDidLoad LandingPage');
     this.navCtrl.push(RegisterPage);

  }
   async login(user: User){
      try{
      const result = await this.afAuth.auth.signInWithEmailAndPassword(this.user.email,this.user.password);
      console.log(result);

      if (this.user.email == "admin@admin.com"){
        
         this.toast.create({
        message:"Welcome Adninistrator",
        duration: 3000
      }).present();
      this.navCtrl.setRoot(DashboardPage);

        
      } else{

        this.toast.create({
        message:"Login Successful",
        duration: 3000
      }).present();

      this.navCtrl.setRoot(TabsPage);

      }

     
      
  }
  catch(e){
    console.log(e);
    this.toast.create({
      message: e.message,
      duration: 3000
    }).present();
  
   }
 }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad LandingPage');
    }

}
