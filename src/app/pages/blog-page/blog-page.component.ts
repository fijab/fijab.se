import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollToTopComponent } from '../../components/scroll-to-top/scroll-to-top.component';

interface Blog {
  image: string;
  title: string;
  description: string;
  category: string;
}

@Component({
  selector: 'app-blog-page',
  standalone: true,
  imports: [CommonModule, ScrollToTopComponent],
  templateUrl: './blog-page.component.html',
  styleUrl: './blog-page.component.css'
})

export class BlogPageComponent {
  blogs: Blog[] = [
    {
      image: 'assets/images/blog1.jpg',
      title: 'Blog Article 1',
      description: 'This is a short description of blog article 1.',
      category: 'Kategori 1'
    },

  ];
}