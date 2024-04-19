import { Component } from '@angular/core';
import { ContactFormComponent } from '../../components/contact-form/contact-form.component';
import { FaqSectionComponent } from '../../components/faq-section/faq-section.component';
import { MatCardModule } from '@angular/material/card';
import { MatList } from '@angular/material/list';
import { MatListItem } from '@angular/material/list';


@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [ContactFormComponent, FaqSectionComponent, MatCardModule, MatList, MatListItem],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {

}
