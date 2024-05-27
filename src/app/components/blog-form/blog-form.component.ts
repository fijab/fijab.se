import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BlogService } from '../../services/blog.service';
import { BlogPost } from '../../models/blog-post.model';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-blog-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './blog-form.component.html',
  styleUrl: './blog-form.component.css'
})
export class BlogFormComponent {
  blog: BlogPost = {
    id: 0,
    title: '',
    content: '',
    author: '',
    date: new Date()
  };

  private blogService = inject(BlogService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  constructor() {
    this.route.params.subscribe((params: Params) => {
      if (params['id']) {
        const blog = this.blogService.getBlog(+params['id']);
        if (blog) {
          this.blog = { ...blog };
        }
      }
    });
  }

  onSubmit() {
    if (this.blog.id) {
      this.blogService.updateBlog(this.blog);
    } else {
      this.blog.id = Date.now();
      this.blogService.addBlog(this.blog);
    }
    this.router.navigate(['/admin']);
  }
}
