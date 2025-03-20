import { Component, OnInit, AfterViewInit, Renderer2, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})

export class BlogDetailComponent implements OnInit, AfterViewInit {
  blog: any = null;
  sections: { title: string; id: string }[] = []; // For TOC
  activeSectionId: string | null = null;
  safeContent: SafeHtml = '';

  constructor(
    private route: ActivatedRoute,  // Injecting ActivatedRoute
    private blogService: BlogService  // Injecting BlogService
  ) {}

  
  private renderer = inject(Renderer2);
  private sanitizer = inject(DomSanitizer);

  ngOnInit(): void {
    const blogId = this.route.snapshot.paramMap.get('id');  // Fetching id from URL
    if (blogId) {
      this.blogService.getBlogById(blogId).subscribe(response => {
        this.blog = response;
      });
    }
  }
  
  

  ngAfterViewInit(): void {
    // Wait a short while for the content to render
    setTimeout(() => {
      this.extractHeadings();
      this.setupIntersectionObserver();
    }, 500);
  }

  // Extract headings (h2, h3, h4) for the TOC
  extractHeadings(): void {
    const contentElement = document.querySelector('.blog-content');
    if (contentElement) {
      const headings = contentElement.querySelectorAll('h2, h3, h4');
      this.sections = Array.from(headings).map((heading, index) => {
        const id = 'section-' + index;
        heading.id = id;
        return { title: heading.textContent || '', id: id };
      });
    }
  }

  // Set up an IntersectionObserver to detect active TOC section
  setupIntersectionObserver(): void {
    const options = { root: null, rootMargin: '0px', threshold: 0.5 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.activeSectionId = entry.target.id;
        }
      });
    }, options);

    this.sections.forEach(section => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });
  }

  // Smooth scrolling to a section
  scrollToSection(event: Event, sectionId: string): void {
    event.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // Format content into paragraphs (splitting on newline)
  formatContent(content: string): string {
    return content.split('\n').map(paragraph => `<p class="paragraph">${paragraph}</p>`).join('');
  }
}








