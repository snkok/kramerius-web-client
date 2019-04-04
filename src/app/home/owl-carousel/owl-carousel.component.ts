import {Component, ViewChild} from '@angular/core';
import {OwlCarousel} from 'ngx-owl-carousel';

@Component({
  selector: 'app-owl-carousel',
  templateUrl: './owl-carousel.component.html',
})
export class OwlCarouselComponent {
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

  video1Id = 'ee6whfngY4E';
  video2Id = 'o0k5WOsRd4Y';
  videoWidth = '100%';
  videoHeight = '100%';

  private yt1Event;
  private yt2Event;
  private player1;
  private player2;

  images = [
    {
      image: '../../../assets/img/snk_carousel_img1.jpg'
    },
    {
      image: '../../../assets/img/snk_carousel_img2.jpg'
    },
  ];

  onVideo1StateChange(event) {
    this.yt1Event = event.data;
    this.owlElement.trigger('stop.owl.autoplay');
  }

  onVideo2StateChange(event) {
    this.yt2Event = event.data;
    this.owlElement.trigger('stop.owl.autoplay');
  }

  savePlayer1(player) {
    this.player1 = player;
  }
  savePlayer2(player) {
    this.player2 = player;
  }

  onTranslateCallback() {
    if (this.yt1Event === 1) {
      this.player1.pauseVideo();
    } else if (this.yt2Event === 1) {
      this.player2.pauseVideo();
    }
  }
}
