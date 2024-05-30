import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { BlogPost } from '../../models/blog-post.model';

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

  constructor() {
    this.blogs = this.blogService.getBlogs();
  }
}
