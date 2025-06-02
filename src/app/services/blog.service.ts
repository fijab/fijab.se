import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BlogPost } from '../models/blog-post.model';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  // Strapi endpoint for blog posts
  private apiUrl = 'https://strapi.fijab.se/api';

  constructor(private http: HttpClient) {}

  /** Fetch all blogs from Strapi and map to BlogPost[] */
  getBlogs(): Observable<BlogPost[]> {
    return this.http.get<any>(`${this.apiUrl}/articles`).pipe(
      map(response => response.data.map((item: any) => this.mapStrapiBlog(item)))
    );
  }

  /** Fetch a single blog by id */
  getBlogById(id: string): Observable<BlogPost> {
    return this.http.get<any>(`${this.apiUrl}/articles/${id}?populate=*`).pipe(
      map(response => {
        if (response.data.length === 0) {
          throw new Error('Blog post not found');
        }
        const post = response.data; // Extract first matching post
        return {
          id: post.documentId,
          title: post.title,
          content: post.description,
          author: post.author || 'Unknown',
          date: post.createdAt || new Date().toISOString()
        };
      })
    );
  }
  
  
  

  /** Map a Strapi response item to BlogPost */
  private mapStrapiBlog(item: any): BlogPost {
    return {
      id: item.documentId,
      title: item.title,                     // Use 'Title' (capital T)
      content: item.description,                 // Use 'Content'
      author: item.author || '',             // Use 'Author' if available; otherwise, default to empty string
      date: item.createdAt ? new Date(item.createdAt) : new Date(), // Use 'Date' (if null, default to new Date)
      category: item.category || '',         // Use 'Category'
      featured: item.featured || false,      // If you have a "featured" flag
      image: item.image || ''                // Use 'image' if available
    };
  }
}

