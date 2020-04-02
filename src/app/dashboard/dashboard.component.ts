import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import "firebase/storage";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  constructor(public storage: AngularFireStorage) { }

  ngOnInit() {
    // this.storage.storage.ref("AnimeList")
    // this.storage.storage.ref("Beck")
    // this.storage.storage.ref("Kenshin")
    // this.storage.storage.ref("Sueltos")
    // this.storage.storage.ref("flv")
    let storageRef = this.storage.storage.ref("AnimeList")
    console.log(storageRef)
    storageRef.listAll().then((result) => {
      result.items.forEach((imageRef) => {
        this.displayImage(imageRef);
      });
    })
  }

    displayImage(imageRef) {
    imageRef.getDownloadURL().then(function(url) {
      console.log(url)
    }).catch(function(error) {
      // Handle any errors
    });
  }
}







//   function randomHSL(){
//     return "hsla(" + ~~(360 * Math.random()) + "," +
//                     "70%,"+
//                     "80%,1)"
//   }

// rdm.onclick = (function(){
//    document.body.style.backgroundColor = randomHSL()
// })
// rdm.click()

// <button id="rdm">Random pastel color!</button>
