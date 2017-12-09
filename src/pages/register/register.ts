import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../modules/user';
import {AngularFireAuth} from 'angularfire2/auth';
import {ToastController} from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {


user = { } as User;

  constructor(private toast:ToastController, public navCtrl: NavController, public navParams: NavParams,private afAuth: AngularFireAuth) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  cancel(){
    this.navCtrl.pop();
  }

  async registerUser(user: User){
    try{
    const result = await this.afAuth.auth.createUserWithEmailAndPassword(this.user.email,this.user.password);
    console.log(result);
    this.toast.create({
      message:"Account Successfully Created",
      duration: 3000
    }).present();
    this.navCtrl.pop();
  }
  catch(e){
    console.log(e);
    this.toast.create({
      message: e.message,
      duration: 3000
    }).present();
  }
  

  }

 

}
