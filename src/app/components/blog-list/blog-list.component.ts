import { Component, inject } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { BlogPost } from '../../models/blog-post.model';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { SlugifyService } from '../../services/slugify.service';

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
  private slugifyService = inject(SlugifyService);
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
  
  generateLink(blog: BlogPost): string[] {
    const categorySlug = this.slugifyService.slugify(blog.category ?? '');
    const titleSlug = this.slugifyService.slugify(blog.title);
    return ['/blog', categorySlug, titleSlug];
  }
}




