import { Component, inject } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { BlogPost } from '../../models/blog-post.model';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})
export class AdminPanelComponent {
  blogs: BlogPost[];

  private blogService = inject(BlogService); 
  private router = inject(Router);

  constructor() {
    this.blogs = this.blogService.getBlogs();
  }

  createNewBlog() {
    this.router.navigate(['/admin/new']);
  }

  editBlog(blog: BlogPost) {
    this.router.navigate(['/admin/edit', blog.link]);
  }

  deleteBlog(id: number) {
    this.blogService.deleteBlog(id);
    this.blogs = this.blogService.getBlogs();
  }

  setFeaturedBlog(id: number) {
    this.blogService.setFeaturedBlog(id);
    this.blogs = this.blogService.getBlogs(); 
  }
}


