import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactFormComponent } from '../../components/contact-form/contact-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ScrollToTopComponent } from '../../components/scroll-to-top/scroll-to-top.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [
    ContactFormComponent,
    CommonModule,
    ReactiveFormsModule,
    ScrollToTopComponent,
    TranslateModule],
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.css'
})
export class ContactPageComponent {

}
