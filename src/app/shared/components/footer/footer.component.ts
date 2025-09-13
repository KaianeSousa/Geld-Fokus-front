import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faInstagram, faGoogle, faWhatsapp, faYoutube } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [FontAwesomeModule, NgOptimizedImage ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  faInstagram = faInstagram;
  faGoogle = faGoogle;
  faWhatsapp = faWhatsapp;
  faYoutube = faYoutube;
}
