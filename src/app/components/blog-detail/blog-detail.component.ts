import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { BlogPost } from '../../models/blog-post.model';


@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.css'
})
export class BlogDetailComponent {
  blog: BlogPost | undefined;

  private blogService = inject(BlogService);
  private route = inject(ActivatedRoute);

  constructor() {
    this.route.params.subscribe((params: Params) => {
      this.blog = this.blogService.getBlog(+params['id']);
    });
  }
}
