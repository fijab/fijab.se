import { Component, inject, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { BlogPost } from '../../models/blog-post.model';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  blogs: BlogPost[] = [];

  private blogService = inject(BlogService);
  private router = inject(Router);

  ngOnInit(): void {
    this.refreshBlogs();
  }

  private refreshBlogs(): void {
    this.blogService.getBlogs().subscribe((response: BlogPost[]) => {
      this.blogs = response;
    });
  }

  createNewBlog(): void {
    this.router.navigate(['/admin/new']);
  }

  editBlog(blog: BlogPost): void {
    this.router.navigate(['/admin/edit', blog.id]);
  }


}



