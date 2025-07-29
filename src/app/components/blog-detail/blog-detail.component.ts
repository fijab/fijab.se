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
        // Process the content for HTML display
        this.safeContent = this.sanitizer.bypassSecurityTrustHtml(
          this.formatContent(this.blog.content)
        );
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

  // Format content into HTML with markdown-like styling
  formatContent(content: string): string {
    if (!content) return '';
    
    return content
      .split('\n')
      .map(line => {
        line = line.trim();
        if (!line) return '<br>';
        
        // Handle headers
        if (line.startsWith('## ')) {
          return `<h2 class="text-2xl font-bold mt-6 mb-4 text-dark-green">${line.substring(3)}</h2>`;
        }
        if (line.startsWith('### ')) {
          return `<h3 class="text-xl font-semibold mt-4 mb-3 text-dark-green">${line.substring(4)}</h3>`;
        }
        
        // Handle bold text
        line = line.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>');
        
        // Handle bullet points
        if (line.startsWith('- ')) {
          return `<li class="ml-4 mb-2">${line.substring(2)}</li>`;
        }
        
        // Handle checkmarks
        if (line.startsWith('✅ ')) {
          return `<div class="flex items-center mb-2"><span class="text-green-500 mr-2">✅</span>${line.substring(2)}</div>`;
        }
        
        // Handle call-to-action
        if (line.startsWith('**Call-to-Action:**')) {
          return `<div class="bg-pastel-green p-4 rounded-lg mt-6 mb-4"><p class="font-bold text-white">${line.replace(/\*\*(.*?)\*\*/g, '$1')}</p></div>`;
        }
        
        // Regular paragraphs
        return `<p class="mb-4 leading-relaxed">${line}</p>`;
      })
      .join('');
  }
}








