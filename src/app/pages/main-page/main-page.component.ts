import { Component } from '@angular/core';
import { ContactFormComponent } from '../../components/contact-form/contact-form.component';
import { FaqSectionComponent } from '../../components/faq-section/faq-section.component';
import { ScrollToTopComponent } from '../../components/scroll-to-top/scroll-to-top.component';


@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [ContactFormComponent, FaqSectionComponent, ScrollToTopComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {

}
