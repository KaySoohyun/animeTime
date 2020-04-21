import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import "firebase/storage";

export interface Song {
  name: string;
  url: string;
  song: any;
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
    console.log(i)
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
            this.currentPlaylist.push({name: song.name, url: url, song: null})
            this.allPlaylist[this.selectedPlaylist].push({name:song.name, url: url, song: null})
          })
          .catch((error) => {
            console.log("Something wrong")
          })
      });
    })
  }

  playList() {
    let index = 0;
    console.log(index, this.allPlaylist[this.selectedPlaylist].length)
    this.sortList();
    this.playSong(index);
  }

  playSong(index) {

    if (!this.allPlaylist[this.selectedPlaylist][index].song) {
      var a = new Audio(this.allPlaylist[this.selectedPlaylist][index].url);
      this.allPlaylist[this.selectedPlaylist][index].song = a;
    }

    console.log(index, this.allPlaylist[this.selectedPlaylist][index].song)

    this.allPlaylist[this.selectedPlaylist][index].song.addEventListener('canplay', () => {
      console.log("canplay", this.allPlaylist[this.selectedPlaylist][index].name)
      a.play();
    });
    
    this.allPlaylist[this.selectedPlaylist][index].song.addEventListener('ended', () => {
      console.log("termino", this.allPlaylist[this.selectedPlaylist][index].name)
      if (index < this.allPlaylist[this.selectedPlaylist].length) {
        index++;
        this.playSong(index);
      }
    });
  }

  sortList() {
    let indexList = this.playlists.findIndex((elem) => elem == 'oldlist');
    if (indexList > -1) {
      console.log(this.allPlaylist[indexList])
      this.allPlaylist[indexList].sort((a, b) => {
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
        return 0;
      })
      console.log(this.allPlaylist[indexList])
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
