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
  private apiUrl = 'http://localhost:1337/api/blog-posts';

  constructor(private http: HttpClient) {}

  /** Fetch all blogs from Strapi and map to BlogPost[] */
  getBlogs(): Observable<BlogPost[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => response.data.map((item: any) => this.mapStrapiBlog(item)))
    );
  }

  /** Fetch a single blog by id */
  getBlogById(id: string): Observable<BlogPost> {
    return this.http.get<any>(`${this.apiUrl}/blog-posts?filters[id][$eq]=${id}&populate=*`).pipe(
      map(response => {
        if (response.data.length === 0) {
          throw new Error('Blog post not found');
        }
        const post = response.data[0]; // Extract first matching post
        return {
          id: post.id,
          title: post.attributes.Title,
          content: post.attributes.Content,
          author: post.attributes.Author || 'Unknown',
          date: post.attributes.Date || new Date().toISOString()
        };
      })
    );
  }
  
  
  

  /** Map a Strapi response item to BlogPost */
  private mapStrapiBlog(item: any): BlogPost {
    return {
      id: item.id,
      title: item.Title,                     // Use 'Title' (capital T)
      content: item.Content,                 // Use 'Content'
      author: item.Author || '',             // Use 'Author' if available; otherwise, default to empty string
      date: item.Date ? new Date(item.Date) : new Date(), // Use 'Date' (if null, default to new Date)
      category: item.Category || '',         // Use 'Category'
      featured: item.featured || false,      // If you have a "featured" flag
      image: item.image || ''                // Use 'image' if available
    };
  }
}

