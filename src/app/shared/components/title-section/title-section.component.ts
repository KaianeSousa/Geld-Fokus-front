import {Component, Input} from '@angular/core';
import {NgStyle} from '@angular/common';

@Component({
   selector: 'app-title-section',
   imports: [
      NgStyle
   ],
   templateUrl: './title-section.component.html',
   styleUrl: './title-section.component.scss'
})
export class TitleSectionComponent {
   @Input() content = '';
   @Input() font = {'font-size': '1.5rem'};
}
