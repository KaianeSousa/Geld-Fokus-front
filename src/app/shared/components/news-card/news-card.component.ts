import {Component, Input} from '@angular/core';
import {Article} from '../../../core/@types/Article';
import {RouterLink} from '@angular/router';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-news-card',
   imports: [
      RouterLink,
      NgOptimizedImage
   ],
  templateUrl: './news-card.component.html',
  styleUrl: './news-card.component.scss'
})
export class NewsCardComponent {
   @Input({ required: true }) news!: Article;
}
