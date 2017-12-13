import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../modules/user';
import {AngularFireAuth} from 'angularfire2/auth';
import {ToastController} from 'ionic-angular';
import {FirebaseServiceProvider} from "../../providers/firebase-service/firebase-service";
import { TabsPage } from '../tabs/tabs';


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {


user = { } as User;

  constructor(public firebaseService: FirebaseServiceProvider  ,private toast:ToastController, public navCtrl: NavController, public navParams: NavParams,private afAuth: AngularFireAuth) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  cancel(){
    this.navCtrl.pop();
  }

  addUser(){ 
   this.firebaseService.addUser(
     {
    "Name": this.user.name,
    "Email" : this.user.email,
    "Phone Number" : this.user.phoneNumber as String,
    "Age" : this.user.age as String
   }
  );
 }

  async registerUser(user: User){
    try{
    const result = await this.afAuth.auth.createUserWithEmailAndPassword(this.user.email,this.user.password);
    const res = this.addUser();
    console.log(res);
    console.log(result);
    this.navCtrl.setRoot(TabsPage);
    this.toast.create({
      message:"Account Successfully Created",
      duration: 3000
    }).present();
    //this.navCtrl.pop();
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
