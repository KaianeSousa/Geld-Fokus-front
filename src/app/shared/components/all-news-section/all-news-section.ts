import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {TitleSectionComponent} from '../title-section/title-section.component';
import {Article} from '../../../core/@types/Article';

@Component({
   selector: 'app-all-news-section',
   standalone: true,
   imports: [CommonModule, NgOptimizedImage, TitleSectionComponent],
   templateUrl: './all-news-section.html',
   styleUrls: ['./all-news-section.scss']
})
export class AllNewsSectionComponent implements OnInit, AfterViewInit {
   @Input() recentNews: Article[] = [];
   @Input() popularNews: Article[] = [];
   activeTab: 'recent' | 'popular' = 'recent';

   @ViewChild('tabsContainer') tabsContainer!: ElementRef<HTMLDivElement>;
   @ViewChild('activeIndicator') activeIndicator!: ElementRef<HTMLDivElement>;

   ngOnInit(): void {
      this.activeTab = 'recent';
   }

   ngAfterViewInit(): void {
      setTimeout(() => {
         const initialActiveTab = this.tabsContainer.nativeElement.querySelector('.tab-button.active') as HTMLElement;
         if (initialActiveTab) {
            this.moveIndicator(initialActiveTab);
         }
      }, 0);
   }

   setActiveTab(tab: 'recent' | 'popular', event: MouseEvent): void {
      this.activeTab = tab;

      const clickedTabElement = event.currentTarget as HTMLElement;
      this.moveIndicator(clickedTabElement);
   }

   private moveIndicator(tabElement: HTMLElement): void {
      const indicator = this.activeIndicator.nativeElement;

      const tabWidth = tabElement.offsetWidth;
      const tabLeft = tabElement.offsetLeft;

      indicator.style.width = `${tabWidth}px`;
      indicator.style.transform = `translateX(${tabLeft}px)`;
   }

}
