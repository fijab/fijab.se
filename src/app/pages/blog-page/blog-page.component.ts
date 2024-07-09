import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollToTopComponent } from '../../components/scroll-to-top/scroll-to-top.component';
import { BlogService } from '../../services/blog.service';
import { BlogPost } from '../../models/blog-post.model';
import { BlogListComponent } from '../../components/blog-list/blog-list.component';
import { RouterModule } from '@angular/router';
import { SlugifyService } from '../../services/slugify.service';

@Component({
  selector: 'app-blog-page',
  standalone: true,
  imports: [CommonModule, ScrollToTopComponent, BlogListComponent, RouterModule],
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.css']
})
export class BlogPageComponent implements OnInit {
  blogs: BlogPost[] = [];
  categories: string[] = [];
  filteredBlogs: BlogPost[] = [];
  featuredBlog?: BlogPost;

  private blogService = inject(BlogService);
  private slugifyService = inject(SlugifyService);

  ngOnInit() {
    this.blogs = this.blogService.getBlogs();
    this.filteredBlogs = this.blogs;
    this.extractCategories();
    this.featuredBlog = this.blogService.getFeaturedBlog();
  }

  private extractCategories() {
    const categoriesSet = new Set<string>();
    this.blogs.forEach(blog => {
      if (blog.category) {
        categoriesSet.add(blog.category);
      }
    });
    this.categories = Array.from(categoriesSet);
  }

  filterByCategory(category: string) {
    if (category) {
      this.filteredBlogs = this.blogs.filter(blog => blog.category === category);
    } else {
      this.filteredBlogs = this.blogs;
    }
  }


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
