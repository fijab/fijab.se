import { Injectable } from '@angular/core';
import { BlogPost } from '../models/blog-post.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private storageKey = 'blogPosts';
  private blogs: BlogPost[] = this.loadFromLocalStorage();

  constructor() {
    if (this.blogs.length === 0) {
      this.blogs.push({
        id: 1,
        title: 'Sample Blog Post',
        content: 'This is a sample blog post content.',
        author: 'Author Name',
        date: new Date()
      });
      this.saveToLocalStorage();
    }
  }

  private loadFromLocalStorage(): BlogPost[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  private saveToLocalStorage(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.blogs));
  }

  getBlogs(): BlogPost[] {
    return this.blogs;
  }

  getBlog(id: number): BlogPost | undefined {
    return this.blogs.find(blog => blog.id === id);
  }

  addBlog(blog: BlogPost): void {
    this.blogs.push(blog);
    this.saveToLocalStorage();
  }

  updateBlog(updatedBlog: BlogPost): void {
    const index = this.blogs.findIndex(blog => blog.id === updatedBlog.id);
    if (index !== -1) {
      this.blogs[index] = updatedBlog;
      this.saveToLocalStorage();
    }
  }

  deleteBlog(id: number): void {
    this.blogs = this.blogs.filter(blog => blog.id !== id);
    this.saveToLocalStorage();
  }

  setFeaturedBlog(id: number): void {
    this.blogs.forEach(blog => {
      blog.featured = blog.id === id;
    });
    this.saveToLocalStorage();
  }

  getFeaturedBlog(): BlogPost | undefined {
    return this.blogs.find(blog => blog.featured);
  }
}
