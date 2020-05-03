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

  currentIndex: number = 0;
  constructor(public storage: AngularFireStorage) { }

  ngOnInit() { 
    this.otra();
  }

  otra(){
    let downloadedImg;
  //   let imageBox = document.querySelector(".imagebox");

  // window.addEventListener("load", startup, false);

  //   function startup() {
  //     let buttonElement = document.getElementById("download");
      
  //     buttonElement.addEventListener("click", startDownload, false);
  //   }

    // function startDownload() {  
      let imageURL = "https://cdn.glitch.com/4c9ebeb9-8b9a-4adc-ad0a-238d9ae00bb5%2Fmdn_logo-only_color.svg?1535749917189";
      downloadedImg = new Image;
      downloadedImg.crossOrigin = "Anonymous";
      downloadedImg.addEventListener("load", imageReceived, false);
      downloadedImg.src = imageURL;
    // }

    function imageReceived() {
      let canvas = document.createElement("canvas");
      let context = canvas.getContext("2d");
      
      canvas.width = downloadedImg.width;
      canvas.height = downloadedImg.height;
      
      context.drawImage(downloadedImg, 0, 0);
      // imageBox.appendChild(canvas);
      
      try {
        console.log(canvas.toDataURL("image/png"))
        localStorage.setItem("saved-image-example", canvas.toDataURL("image/png"));
      }
      catch(err) {
        console.log("Error: " + err);
      }  
    }
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
    this.currentIndex = 0;
    console.log(this.currentIndex, this.allPlaylist[this.selectedPlaylist].length)
    this.sortList();
    this.playSong();
  }

  playSong() {

    if (!this.allPlaylist[this.selectedPlaylist][this.currentIndex].song) {
      var a = new Audio(this.allPlaylist[this.selectedPlaylist][this.currentIndex].url);
      this.allPlaylist[this.selectedPlaylist][this.currentIndex].song = a;
    }

    console.log(this.currentIndex, this.allPlaylist[this.selectedPlaylist][this.currentIndex].song)

    this.allPlaylist[this.selectedPlaylist][this.currentIndex].song.addEventListener('canplay', () => {
      console.log("canplay", this.allPlaylist[this.selectedPlaylist][this.currentIndex].name)
      a.play();
    });
    
    this.allPlaylist[this.selectedPlaylist][this.currentIndex].song.addEventListener('ended', () => {
      console.log("termino", this.allPlaylist[this.selectedPlaylist][this.currentIndex].name)
      if (this.currentIndex < this.allPlaylist[this.selectedPlaylist].length) {
        this.currentIndex++;
        this.playSong();
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
    this.allPlaylist[this.selectedPlaylist][this.currentIndex].song.pause()
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
