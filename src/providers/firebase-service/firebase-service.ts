import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database-deprecated';
/*
  Generated class for the FirebaseServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseServiceProvider {

  constructor(public afd: AngularFireDatabase) {
    console.log('Hello FirebaseServiceProvider Provider');
  }



getReport(){
return this.afd.list('/Report');
} 

addReport(name){
  this.afd.list('/Report').push(name)

}
removeReport(id){
    this.afd.list('/Report').remove(id);
}

getUsert(){
return this.afd.list('/User');
} 

addUser(name){
  this.afd.list('/User').push(name)

}
removeUser(id){
    this.afd.list('/User').remove(id);
}
} 
