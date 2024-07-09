import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { BlogPost } from '../../models/blog-post.model';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {
  blog: BlogPost | undefined;

  private blogService = inject(BlogService);
  private route = inject(ActivatedRoute);

  ngOnInit() {
    const category = this.route.snapshot.paramMap.get('category')!;
    const title = this.route.snapshot.paramMap.get('title')!;
    const link = `blog/${category}/${title}`;
    this.blog = this.blogService.getBlog(link);
  }

  formatContent(content: string): string {
    return content.split('\n').map(paragraph => `<p class="paragraph">${paragraph}</p>`).join('');
  }
}


