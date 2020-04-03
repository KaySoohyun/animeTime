import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import "firebase/storage";

export interface Song {
  name: string;
  url: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})

export class DashboardComponent implements OnInit {

  playlists: Array<string> = ["animeflv", "beck", "kenshin", "newlist", "oldlist"]
  selectedPlaylist: number = -1;
  currentPlaylist: Array<Song> = [];
  allPlaylist: Array<Array<Song>> = [[], [], [], [], []];

  constructor(public storage: AngularFireStorage) { }

  ngOnInit() { }

  onSelectPlaylist(i) {
    this.selectedPlaylist = i;
    if (this.allPlaylist[this.selectedPlaylist].length > 0) {
      this.currentPlaylist = this.allPlaylist[this.selectedPlaylist]
    } else {
      this.getSongs()
    }
  }

  getSongs() {
    this.currentPlaylist.length = 0;
    this.currentPlaylist = [];

    let storageRef = this.storage.storage.ref(this.playlists[this.selectedPlaylist])
    storageRef.listAll().then((playlist) => {
      playlist.items.forEach((song) => {
        song.getDownloadURL()
          .then((url) => {
            this.currentPlaylist.push({name:song.name, url: url})
            this.allPlaylist[this.selectedPlaylist].push({name:song.name, url: url})
          })
          .catch((error) => {
            console.log("Something wrong")
          })
      });
    })
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
