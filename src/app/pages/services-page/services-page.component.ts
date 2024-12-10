import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactFormComponent } from '../../components/contact-form/contact-form.component';
import { ScrollToTopComponent } from '../../components/scroll-to-top/scroll-to-top.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-our-services',
  standalone: true,
  imports: [CommonModule, ContactFormComponent, ScrollToTopComponent, RouterModule, TranslateModule],
  templateUrl: './services-page.component.html',
  styleUrl: './services-page.component.css'
})
export class ServicesPageComponent {
  step: number = 1;

  services = [
    {
      icon: "frontend",
      title: "SERVICES.FRONTEND.TITLE",
      description: "SERVICES.FRONTEND.DESCRIPTION",
      iconPath: "M21 16V8..."
    },
    {
      icon: "backend",
      title: "SERVICES.BACKEND.TITLE",
      description: "SERVICES.BACKEND.DESCRIPTION",
      iconPath: "M16 20V4..."
    },
    {
      icon: "devops",
      title: "SERVICES.DEVOPS.TITLE",
      description: "SERVICES.DEVOPS.DESCRIPTION",
      iconPath: "M12 20a8..."
    },
    // Add other services similarly...
  ];

  whyUsPoints = [
    "SERVICES_PAGE.PROFESSIONAL_SERVICE",
    "SERVICES_PAGE.COST_EFFECTIVE",
    "SERVICES_PAGE.CUSTOMIZED_SOLUTIONS",
    "SERVICES_PAGE.FAST_SUPPORT",
    "SERVICES_PAGE.INNOVATIVE_TECH"
  ];

  setStep(step: number) {
    this.step = step;
  }
}



