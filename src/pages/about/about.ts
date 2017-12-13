import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera,CameraOptions } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import {GoogleMaps,GoogleMap,GoogleMapsEvent,GoogleMapOptions,CameraPosition,MarkerOptions,Marker} from '@ionic-native/google-maps';
import { Report } from '../../modules/report';
import {storage} from 'firebase'
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabase } from 'angularfire2/database-deprecated';
import {FirebaseServiceProvider} from "../../providers/firebase-service/firebase-service";
import {ToastController} from 'ionic-angular';
import {FirebaseListObservable} from 'angularfire2/database-deprecated'
import { Storage } from '@ionic/storage';
 

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})

export class AboutPage {
 report = {} as Report;
 description;
 authority;
 latitude;
 longitude;
 bool = false;
 imageIds=[]; 
 //@ViewChild ('map') mapRef:ElementRef;
 map: GoogleMap;
 reports: FirebaseListObservable<any[]>;
 

public base64Image: string; 
   
  constructor(private storage: Storage,private toast:ToastController,public firebaseService: FirebaseServiceProvider  ,private afd: AngularFireDatabase, private googleMaps: GoogleMaps, private geolocation: Geolocation, private camera: Camera,public navCtrl: NavController) { 
   this.reports = this.firebaseService.getReport();
  }



 addReport(){ 
   this.firebaseService.addReport(
     {
    "description":this.report.description,
    "authority" : this.report.authority,
    "longitude" : this.report.longitude,
    "latitude" : this.report.latitude
   }
  );
 }

 removeItem(id){
   this.firebaseService.removeReport(id);
 }



 checkStatus(){
   return this.bool;
 }

 locate(){
    this.geolocation.getCurrentPosition().then((resp) => {
    this.latitude = resp.coords.latitude
    this.longitude = resp.coords.longitude

    this.report.longitude = this.longitude as string;
    this.report.latitude = this.latitude as string;
    this.bool=true;
    }).catch((error) => {
      console.log('Error getting location', error);
    });

 }
 cancel(){
    this.bool = false;
    this.report.longitude=null;
    this.report.latitude=null;
    this.report.description=null;
    this.report.authority=null;
  }

 loadMap() {
    this.locate();

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: this.latitude,
          lng: this.longitude
        },
        zoom: 18,
        tilt: 30
      }
    };

    this.map = this.googleMaps.create('map_canvas', mapOptions);

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        console.log('Map is ready!');

        // Now you can use all methods safely.
        this.map.addMarker({
            title: 'Ionic',
            icon: 'blue',
            animation: 'DROP',
            position: {
              lat: this.latitude,
              lng: this.longitude
            }
          })
          .then(marker => {
            marker.on(GoogleMapsEvent.MARKER_CLICK)
              .subscribe(() => {
                alert('clicked');
              });
          });

      });
  }


makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

async takePicture(){
   try{ const options: CameraOptions = {
    quality: 50,
    targetHeight:600,
    targetWidth:600,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }
    const result = await this.camera.getPicture(options).then((imageData) => {
    // imageData is either a base64 encoded string or a file URI
    // If it's base64:
    const image = 'data:image/jpeg;base64,' + imageData;
    const id = this.makeid();
    const pictures = storage().ref(id);
    pictures.putString(image,'data_url');
  

    this.storage.set('ids', this.imageIds.push(id));

    console.log("picture taken");
    }, (err) => {
    // Handle error
  });
   }catch (e){

   }
 
 
  //this.loadMap();
  }
  send(){
 
     try{
      const result = this.addReport();
      console.log(result);
      this.toast.create({
        message:"Report Successfuly Sent",
        duration: 3000
      }).present();
       this.bool = false;
    this.report.longitude=null;
    this.report.latitude=null;
    this.report.description=null;
    this.report.authority=null;
      
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



