import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-all-news-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './all-news-section.html',
  styleUrls: ['./all-news-section.scss']
})
export class AllNewsSectionComponent {
  @Input() allNews: { img: string, title: string, source: string, time: string, description: string }[] = [];
  activeTab = 'recent';

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}
