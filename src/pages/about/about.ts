import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera,CameraOptions } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import {GoogleMaps,GoogleMap,GoogleMapsEvent,GoogleMapOptions,CameraPosition,MarkerOptions,Marker} from '@ionic-native/google-maps';
import { Report } from '../../modules/report';



@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})

export class AboutPage {
 report = {} as Report;
 latitude;
 longitude;
 bool = false;
 @ViewChild ('map') mapRef:ElementRef;
 map: GoogleMap;

public base64Image: string; 

  constructor( private googleMaps: GoogleMaps, private geolocation: Geolocation, private camera: Camera,public navCtrl: NavController) { }
 
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



takePicture(){
    const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }
    this.camera.getPicture(options).then((imageData) => {
    // imageData is either a base64 encoded string or a file URI
    // If it's base64:
    let base64Image = 'data:image/jpeg;base64,' + imageData;
    console.log("picture taken");
    }, (err) => {
    // Handle error
  });
  
 
  //this.loadMap();



  }

}



