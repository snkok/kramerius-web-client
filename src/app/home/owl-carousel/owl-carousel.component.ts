import {Component, OnInit, ViewChild} from '@angular/core';
import {OwlCarousel} from 'ngx-owl-carousel';

@Component({
  selector: 'app-owl-carousel',
  templateUrl: './owl-carousel.component.html',
})
export class OwlCarouselComponent implements OnInit {
  @ViewChild('owlElement') owlElement: OwlCarousel;


  constructor() {
  }

  carouselOptions = {
    items: 1,
    // margin: 25,
    // video: true,
    // autoplayHoverPause: true,
    checkVisible: false,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    loop: true,
    autoplay: true,
    onTranslate: this.onTranslateCallback.bind(this),
  };

  images = [
    {
      image: '../../../assets/img/snk_carousel_img1.jpg'
    },
    {
      image: '../../../assets/img/snk_carousel_img2.jpg'
    },
  ];

   video1Id = 'ee6whfngY4E';
   video2Id = 'o0k5WOsRd4Y';

   private yt1Event;
   private yt2Event;
   private player1;
   private player2;

   onVideo1StateChange(event) {
     this.yt1Event = event.data;
     this.owlElement.trigger('stop.owl.autoplay');
   }

   onVideo2StateChange(event) {
     this.yt2Event = event.data;
     this.owlElement.trigger('stop.owl.autoplay');
   }

   onTranslateCallback() {
     if (this.yt1Event === 1) {
       this.player1.pauseVideo();
     } else if (this.yt2Event === 1) {
       this.player2.pauseVideo();
     }
   }

  init() {
    // Return if Player is already created
    if (window['YT']) {
      this.initPlayers();
      return;
    }

    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    /* 3. startVideo() will create an <iframe> (and YouTube player) after the API code downloads. */
    window['onYouTubeIframeAPIReady'] = () => this.initPlayers();
  }

  ngOnInit() {
    this.init();
  }

  initPlayers() {
    this.player1 = new window['YT'].Player('player1', {
      videoId: this.video1Id,
      playerVars: {
        autoplay: 0,
        modestbranding: 1,
        controls: 1,
        disablekb: 1,
        rel: 0,
        showinfo: 0,
        fs: 0,
        playsinline: 1
      },
      events: {
        'onStateChange': this.onVideo1StateChange.bind(this),
      }
    });

    this.player2 = new window['YT'].Player('player2', {
      videoId: this.video2Id,
      playerVars: {
        autoplay: 0,
        modestbranding: 1,
        controls: 1,
        disablekb: 1,
        rel: 0,
        showinfo: 0,
        fs: 0,
        playsinline: 1
      },
      events: {
        'onStateChange': this.onVideo2StateChange.bind(this),
      }
    });
  }
}
