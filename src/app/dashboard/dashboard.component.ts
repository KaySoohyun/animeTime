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
  clickedPlayslist: number = -1;
  constructor(public storage: AngularFireStorage) { }

  ngOnInit() { 

  }

  onSelectPlaylist(i) {
    this.selectedPlaylist = i;
    this.clickedPlayslist = i;
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

  playList() {
    let index = 0;
    while (index < this.allPlaylist[this.selectedPlaylist].length) {
      var a = new Audio(this.allPlaylist[this.selectedPlaylist][index].url);
      console.log("empieza")
      
      a.addEventListener('canplay', (event) => {
        a.play();
        console.log("empieza")
      });
      a.addEventListener('ended', (event) => {
        console.log("termino", this.allPlaylist[this.selectedPlaylist][index].name)
        index++;
      });
    }
  }

  pauseList() {
    
  }

  stopList() {
    
  }

  shuffleList() {
    
  }

  repeatList() {
    
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
