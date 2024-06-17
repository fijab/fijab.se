import { Component, inject, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BlogService } from '../../services/blog.service';
import { BlogPost } from '../../models/blog-post.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import Quill from 'quill';

@Component({
  selector: 'app-blog-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.css']
})
export class BlogFormComponent implements AfterViewInit, OnDestroy {
  blog: BlogPost = {
    id: 0,
    title: '',
    content: '',
    author: '',
    date: new Date(),
    image: '',
    category: '',
    link: ''
  };

  categories = ['Marknadsföring', 'SEO', 'UX/UI design', 'Webbutveckling'];
  quill: Quill | undefined;

  private blogService = inject(BlogService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  constructor() {
    this.route.params.subscribe((params: Params) => {
      const link = params['link'] as string | undefined;
      if (link) {
        const blog = this.blogService.getBlog(link);
        if (blog) {
          this.blog = { ...blog };
        }
      }
    });
  }

  ngAfterViewInit() {
    this.quill = new Quill('#editor', {
      theme: 'snow',
      placeholder: 'Compose an epic...',
      modules: {
        toolbar: [
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline'],
          ['image', 'code-block'],
          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
          [{ 'indent': '-1' }, { 'indent': '+1' }],
        ]
      },
    });

    if (this.blog.content) {
      this.quill.root.innerHTML = this.blog.content;
    }
  }

  ngOnDestroy() {
    if (this.quill) {
      this.quill = undefined;
    }
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.blog.image = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  generateLink(title: string, category: string): string {
    const titleSlug = this.blogService.slugify(title);
    const categorySlug = this.blogService.slugify(category);
    return `blog/${categorySlug}/${titleSlug}`;
  }

  onSubmit() {
    if (this.quill) {
      this.blog.content = this.quill.root.innerHTML;
    }

    this.blog.link = this.generateLink(this.blog.title, this.blog.category ?? '');

    if (this.blog.id) {
      this.blogService.updateBlog(this.blog);
    } else {
      this.blog.id = Date.now();
      this.blogService.addBlog(this.blog);
    }
    this.router.navigate(['/admin']);
  }
}



