import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

Swiper.use([Navigation]);

@Component({
  selector: 'app-news-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './news-carousel.html',
  styleUrls: ['./news-carousel.scss']
})
export class NewsCarouselComponent implements AfterViewInit {
  @ViewChild('swiperContainer', { static: false }) swiperContainer!: ElementRef;

  newsItems = [
    { img: 'https://placehold.co/200x120?text=News+1', description: 'Mercados se preparam para volatilidade em meio às manobras...' },
    { img: 'https://placehold.co/200x120?text=News+2', description: 'O mundo é um lugar perigoso...' },
    { img: 'https://placehold.co/200x120?text=News+3', description: 'Notícia 3...' },
    { img: 'https://placehold.co/200x120?text=News+4', description: 'Notícia 4...' },
    { img: 'https://placehold.co/200x120?text=News+5', description: 'Notícia 5...' },
    { img: 'https://placehold.co/200x120?text=News+6', description: 'Notícia 6...' },
    { img: 'https://placehold.co/200x120?text=News+7', description: 'Notícia 7...' },
  ];

  ngAfterViewInit() {
    if (typeof window !== 'undefined') {
      new Swiper(this.swiperContainer.nativeElement, {
        slidesPerView: 5,
        spaceBetween: 20,
        loop: true,
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
        breakpoints: {
          320: { slidesPerView: 1, spaceBetween: 10 },
          480: { slidesPerView: 2, spaceBetween: 15 },
          768: { slidesPerView: 3, spaceBetween: 20 },
          1024: { slidesPerView: 5, spaceBetween: 20 }
        }
      });
    }
  }
}
