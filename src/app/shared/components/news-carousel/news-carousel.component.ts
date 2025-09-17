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
import {ArticleService} from '../../../core/services/article.service';
import {register, SwiperContainer} from 'swiper/element/bundle';
import {SwiperOptions} from 'swiper/types';
import {NewsCardComponent} from '../news-card/news-card.component';
import {RouterLink} from '@angular/router';

register();
@Component({
   selector: 'app-news-carousel',
   standalone: true,
   imports: [CommonModule, NewsCardComponent, RouterLink],
   schemas: [CUSTOM_ELEMENTS_SCHEMA],
   templateUrl: './news-carousel.component.html',
   styleUrls: ['./news-carousel.component.scss']
 })
 
 export class NewsCarouselComponent implements OnInit, OnDestroy {
   private articleService = inject(ArticleService);
   private readonly platformId = inject(PLATFORM_ID);
 
   newsState$!: Observable<{ loading: boolean; news: Article[] | null }>;
 
   @ViewChild('swiperContainer')
   set swiperContainer(el: ElementRef<SwiperContainer> | undefined) {
     if (el) {
       this.swiperContainerEl = el;
       this.initializeSwiper();
     }
   }
 
   private swiperContainerEl?: ElementRef<SwiperContainer>;
 
   ngOnInit(): void {
     this.getNews();
   }
 
   ngOnDestroy(): void {
     const swiperInstance = this.swiperContainerEl?.nativeElement.swiper;
     swiperInstance?.destroy(true, true);
   }
 
   getNews(page = 0, size = 10): void {
     this.newsState$ = this.articleService
       .getPublishedArticles(page, size)
       .pipe(
         map(pageData => ({
           loading: false,
           news: pageData.content, 
         })),
         startWith({ loading: true, news: null }),
         catchError(() => of({ loading: false, news: null }))
       );
   }
 
   private initializeSwiper(): void {
     if (!isPlatformBrowser(this.platformId) || !this.swiperContainerEl) return;
 
     const swiperEl = this.swiperContainerEl.nativeElement;
     if (swiperEl.swiper) return;
 
     const swiperOptions: SwiperOptions = {
       slidesPerView: 5,
       spaceBetween: 20,
       loop: true,
       navigation: {
         nextEl: '.swiper-button-next',
         prevEl: '.swiper-button-prev',
       },
     };
 
     Object.assign(swiperEl, swiperOptions);
     swiperEl.initialize();
   }
 }
 