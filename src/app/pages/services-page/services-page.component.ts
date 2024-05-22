import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactFormComponent } from '../../components/contact-form/contact-form.component';

@Component({
  selector: 'app-our-services',
  standalone: true,
  imports: [CommonModule, ContactFormComponent],
  templateUrl: './services-page.component.html',
  styleUrl: './services-page.component.css'
})
export class ServicesPageComponent {
  step: number = 1;

  setStep(step: number) {
    this.step = step;
  }

}


