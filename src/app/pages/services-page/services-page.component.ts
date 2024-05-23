import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactFormComponent } from '../../components/contact-form/contact-form.component';
import { ScrollToTopComponent } from '../../components/scroll-to-top/scroll-to-top.component';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-our-services',
  standalone: true,
  imports: [CommonModule, ContactFormComponent, ScrollToTopComponent, RouterModule, RouterOutlet],
  templateUrl: './services-page.component.html',
  styleUrl: './services-page.component.css'
})
export class ServicesPageComponent {
  step: number = 1;

  setStep(step: number) {
    this.step = step;
  }

}


