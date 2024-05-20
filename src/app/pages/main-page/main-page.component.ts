import { Component } from '@angular/core';
import { ContactFormComponent } from '../../components/contact-form/contact-form.component';
import { FaqSectionComponent } from '../../components/faq-section/faq-section.component';



@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [ContactFormComponent, FaqSectionComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {

}
