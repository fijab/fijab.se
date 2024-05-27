import { Injectable } from '@angular/core';
import { BlogPost } from '../models/blog-post.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private blogs: BlogPost[] = [];

  constructor() {}

  getBlogs(): BlogPost[] {
    return this.blogs;
  }

  getBlog(id: number): BlogPost | undefined {
    return this.blogs.find(blog => blog.id === id);
  }

  addBlog(blog: BlogPost): void {
    this.blogs.push(blog);
  }

  updateBlog(updatedBlog: BlogPost): void {
    const index = this.blogs.findIndex(blog => blog.id === updatedBlog.id);
    if (index !== -1) {
      this.blogs[index] = updatedBlog;
    }
  }

  deleteBlog(id: number): void {
    this.blogs = this.blogs.filter(blog => blog.id !== id);
  }
}