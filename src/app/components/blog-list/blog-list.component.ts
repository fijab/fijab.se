import { Component, inject } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { BlogPost } from '../../models/blog-post.model';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent {
  blogs: BlogPost[];

  private blogService = inject(BlogService);
  private router = inject(Router);

  constructor() {
    this.blogs = this.blogService.getBlogs();
  }

  // Utility function to strip HTML tags and limit text length
  getPreview(content: string, length: number): string {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    const text = tempDiv.textContent || tempDiv.innerText || '';
    return text.length > length ? text.substring(0, length) + '...' : text;
  }

  slugify(text: string): string {
    const map: { [key: string]: string } = {
      'å': 'a', 'ä': 'a', 'ö': 'o',
      'Å': 'A', 'Ä': 'A', 'Ö': 'O',
    };
    return text
      .toLowerCase()
      .replace(/[åäöÅÄÖ]/g, (char) => map[char] || '') // Replace special characters using the map
      .replace(/[\s\W-]+/g, '-') // Replace spaces and non-word characters with dashes
      .replace(/[^a-z0-9-]/g, '') // Remove any remaining invalid characters
      .replace(/-+/g, '-') // Replace multiple dashes with a single dash
      .replace(/^-+|-+$/g, ''); // Remove leading and trailing dashes
  }

  generateLink(blog: BlogPost): string[] {
    return this.blogService.generateLink(blog.title, blog.category ?? '').split('/');
  }
}




