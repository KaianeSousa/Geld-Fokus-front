import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

Swiper.use([Navigation]);

@Component({
  selector: 'app-latest-news-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './latest-news-section.html',
  styleUrls: ['./latest-news-section.scss']
})
export class LatestNewsSectionComponent implements AfterViewInit {
  ngAfterViewInit() {
    if (typeof window !== 'undefined') {
      new Swiper('.news-carousel', {
        slidesPerView: 5,
        spaceBetween: 20,
        loop: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
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
