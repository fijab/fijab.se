import { Component } from '@angular/core';
import { ScrollToTopComponent } from '../../components/scroll-to-top/scroll-to-top.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [ScrollToTopComponent, TranslateModule],
  templateUrl: './about-page.component.html',
  styleUrl: './about-page.component.css'
})
export class AboutPageComponent {

}
