import { Component, NgZone } from '@angular/core';
import { NavController  } from 'ionic-angular';
import {FirebaseServiceProvider} from "../../providers/firebase-service/firebase-service";
import {FirebaseListObservable} from 'angularfire2/database-deprecated'
import storaage from 'firebase'
import { Storage } from '@ionic/storage';
import {ToastController} from 'ionic-angular';
import { Report } from '../../modules/report';
import {LandingPage} from '../landing/landing'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
reports: FirebaseListObservable<any[]>;
imgsource : any;
imgsource1;
imgsource2;
imgsource3;

firestore= storaage.storage();
 array = [];
//report = {} as Report;
  constructor(private toast:ToastController, private store: Storage,public Zone: NgZone, public navCtrl: NavController, private firebaseService: FirebaseServiceProvider ) {
     this.reports = this.firebaseService.getReport();
    // this.reports.subscribe(Reports)
     console.log(this.reports);
  }

 display(){

this.firestore.ref().child('S3D90').getDownloadURL().then((URL) =>{
   this.Zone.run(()=>{
      this.imgsource1 = URL;
      
   })
  })
  this.firestore.ref().child('JnRDr').getDownloadURL().then((URL) =>{
   this.Zone.run(()=>{
      this.imgsource2 = URL;
      
    })
   })
  this.firestore.ref().child('CLcQs').getDownloadURL().then((URL) =>{
   this.Zone.run(()=>{
      this.imgsource3 = URL;
      
   })
  })


  this.firestore.ref().child('8UB5P').getDownloadURL().then((URL) =>{
   this.Zone.run(()=>{
      this.imgsource = URL;
      
   })
  })
 }

 removeItem(id){
   this.firebaseService.removeReport(id);
 }

 ionViewDidLoad(){
   this.display();
 }

 logout()
{
this.toast.create({
        message:"You have been logged Out",
        duration: 3000
      }).present();
      
      this.navCtrl.setRoot(LandingPage);

}


}
