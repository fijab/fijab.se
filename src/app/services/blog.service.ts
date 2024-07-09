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
        link: 'blog/sample-category/sample-blog-post',
        content: 'This is a sample blog post content.',
        author: 'Author Name',
        date: new Date(),
        category: 'Sample Category'
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

  slugify(text: string): string {
    const map: { [key: string]: string } = {
      'å': 'a', 'ä': 'a', 'ö': 'o',
      'Å': 'A', 'Ä': 'A', 'Ö': 'O',
    };
    return text
      .toLowerCase()
      .replace(/[åäöÅÄÖ]/g, (char) => map[char] || '') // Replace special characters using the map
      .replace(/[\s\W-]+/g, '-') // Replace spaces and non-word characters with dashes
      .replace(/[^a-z0-9-]/g, '') // Remove any remaining invalid characters
      .replace(/-+/g, '-') // Replace multiple dashes with a single dash
      .replace(/^-+|-+$/g, ''); // Remove leading and trailing dashes
  }

  generateLink(title: string, category: string): string {
    const titleSlug = this.slugify(title);
    const categorySlug = this.slugify(category);
    return `blog/${categorySlug}/${titleSlug}`;
  }

  getBlogs(): BlogPost[] {
    return this.blogs;
  }

  getBlog(link: string): BlogPost | undefined {
    return this.blogs.find(blog => blog.link === link);
  }

  addBlog(blog: BlogPost): void {
    blog.link = this.generateLink(blog.title, blog.category ?? '');
    this.blogs.push(blog);
    this.saveToLocalStorage();
  }

  updateBlog(updatedBlog: BlogPost): void {
    const index = this.blogs.findIndex(blog => blog.id === updatedBlog.id);
    if (index !== -1) {
      updatedBlog.link = this.generateLink(updatedBlog.title, updatedBlog.category ?? '');
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





