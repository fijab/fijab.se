import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-services-page',
  templateUrl: './services-page.component.html',
  styleUrls: ['./services-page.component.css'],
  standalone: true,
  imports: [CommonModule, MatCardModule, MatGridListModule, MatButtonModule]
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
    },
  ];

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.breakpointObserver.observe([
      Breakpoints.Handset
    ]).subscribe(result => {
      this.cols = result.matches ? 1 : 3; 
    });
  }
}

