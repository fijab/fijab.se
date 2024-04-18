import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-services-page',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatGridListModule, MatButtonModule],
  templateUrl: './services-page.component.html',
  styleUrl: './services-page.component.css'
})
export class ServicesPageComponent {
  services = [
    {
      title: 'Frontend Development',
      subtitle: 'Interactive Interfaces',
      description: 'We specialize in creating stunning visual experiences.',
      image: 'assets/images/frontend.jpg'
    },

    {
      title: 'Backend Development',
      subtitle: 'Interactive Interfaces',
      description: 'We specialize in creating stunning visual experiences.',
      image: 'assets/images/frontend.jpg'
    },

    {
      title: 'UX/UI design',
      subtitle: 'Interactive Interfaces',
      description: 'We specialize in creating stunning visual experiences.',
      image: 'assets/images/frontend.jpg'
    },
  ];

}
