import {
   Component,
   OnInit,
   inject,
   ViewChild,
   CUSTOM_ELEMENTS_SCHEMA,
   ElementRef,
   PLATFORM_ID,
   OnDestroy
} from '@angular/core';
import {isPlatformBrowser, CommonModule} from '@angular/common';
import {catchError, map, Observable, of, startWith} from 'rxjs';
import {Article} from '../../../core/@types/Article';
import {NewsService} from '../../../core/services/news.service';
import {register, SwiperContainer} from 'swiper/element/bundle';
import {SwiperOptions} from 'swiper/types';
import {NewsCardComponent} from '../news-card/news-card.component';
import {RouterLink} from '@angular/router';

register();

@Component({
   selector: 'app-news-carousel',
   imports: [CommonModule, NewsCardComponent, RouterLink],
   schemas: [CUSTOM_ELEMENTS_SCHEMA],
   templateUrl: './news-carousel.html',
   styleUrls: ['./news-carousel.scss']
})
export class NewsCarouselComponent implements OnInit, OnDestroy {
   private newsService = inject(NewsService);
   private readonly platformId = inject(PLATFORM_ID);

   newsState$!: Observable<{
      loading: boolean;
      news: Article[] | null;
   }>;

   private swiperContainerEl?: ElementRef<SwiperContainer>;

   @ViewChild('swiperContainer') set swiperContainer(el: ElementRef<SwiperContainer>) {
      if (el) {
         this.swiperContainerEl = el;
         this.initializeSwiper();
      }
   }

   ngOnInit() {
      this.getNews();
   }

   ngOnDestroy(): void {
      this.swiperContainerEl?.nativeElement?.swiper?.destroy(true, true);
   }

   getNews() {
      this.newsState$ = this.newsService.getAllNews().pipe(
         map(newsData => ({loading: false, news: newsData})),
         startWith({loading: true, news: null}),
         catchError(() => of({loading: false, news: null}))
      );
   }

   initializeSwiper(): void {
      if (!isPlatformBrowser(this.platformId) || !this.swiperContainerEl?.nativeElement) {
         return;
      }

      const swiperEl = this.swiperContainerEl.nativeElement;
      if (swiperEl.swiper) return;

      const swiperOptions = {
         slidesPerView: 5,
         spaceBetween: 20,
         loop: true,
         navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
         },
         pagination: false,
         // breakpoints: {
         //    320: {slidesPerView: 1, spaceBetween: 10,},
         //    480: {
         //       slidesPerView: 2, spaceBetween: 15, pagination: {
         //          el: '.swiper-pagination',
         //          clickable: true,
         //       },
         //       navigation: false,
         //    },
         //    768: {slidesPerView: 3, spaceBetween: 20},
         //    1024: {slidesPerView: 5, spaceBetween: 20},
         // },
      } as SwiperOptions;

      Object.assign(swiperEl, swiperOptions);
      swiperEl.initialize();
   }
}
