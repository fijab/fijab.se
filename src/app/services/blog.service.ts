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
        if (!response.data) {
          throw new Error('Blog post not found');
        }
        const post = response.data;
        
        // Extract content from blocks array
        let content = post.description || '';
        if (post.blocks && post.blocks.length > 0) {
          content = post.blocks
            .filter((block: any) => block.__component === 'shared.rich-text')
            .map((block: any) => block.body || '')
            .join('\n\n');
        }
        
        return {
          id: post.documentId,
          title: post.title,
          content: content,
          author: post.author?.name || 'FIJAB Team',
          date: new Date(post.createdAt || new Date()),
          category: post.category || '',
          featured: post.featured || false,
          image: post.cover?.url || ''
        };
      })
    );
  }
  
  
  

  /** Map a Strapi response item to BlogPost */
  private mapStrapiBlog(item: any): BlogPost {
    // Extract content from blocks or use description as fallback
    let content = item.description || '';
    if (item.blocks && item.blocks.length > 0) {
      content = item.blocks
        .filter((block: any) => block.__component === 'shared.rich-text')
        .map((block: any) => block.body || '')
        .join('\n\n');
    }
    
    return {
      id: item.documentId,
      title: item.title,
      content: content,
      author: item.author?.name || 'FIJAB Team',
      date: item.createdAt ? new Date(item.createdAt) : new Date(),
      category: item.category || '',
      featured: item.featured || false,
      image: item.cover?.url || item.image || ''
    };
  }
}

