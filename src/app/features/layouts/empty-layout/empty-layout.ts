import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../../shared/components/footer/footer.component';

@Component({
  selector: 'app-empty-layout',
  imports: [RouterOutlet, FooterComponent],
  standalone: true,
  templateUrl: './empty-layout.html',
  styleUrl: './empty-layout.scss'
})
export class EmptyLayout {

}
