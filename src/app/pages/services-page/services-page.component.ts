import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-services-page',
  templateUrl: './services-page.component.html',
  styleUrls: ['./services-page.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ServicesPageComponent implements OnInit {
  cols: number = 3;
  services = [
    {
      title: 'Frontendutveckling',
      subtitle: 'Interactive Interfaces',
      description: 'We specialize in creating stunning visual experiences.',
      image: 'assets/icons/business-development.gif'
    },
    {
      title: 'Backendutveckling',
      subtitle: 'Interactive Interfaces',
      description: 'We specialize in creating stunning visual experiences.',
      image: 'assets/icons/management.gif'
    },
    {
        title: 'UX/UI Design',
        subtitle: 'Interactive Interfaces',
        description: 'We specialize in creating stunning visual experiences.',
        image: 'assets/icons/web-structure.gif'
    }
  ];

  // ngOnInit method implementation
  ngOnInit(): void {
    // Initialization logic here
  }
}


