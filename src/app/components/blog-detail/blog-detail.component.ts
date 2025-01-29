import { Component, inject, OnInit, AfterViewInit, Renderer2 } from '@angular/core';
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
export class BlogDetailComponent implements OnInit, AfterViewInit {
  blog: BlogPost | undefined;
  sections: { title: string; id: string }[] = [];  // Store sections for TOC
  activeSectionId: string | null = null;

  private blogService = inject(BlogService);
  private route = inject(ActivatedRoute);
  private renderer = inject(Renderer2);

  ngOnInit() {
    const category = this.route.snapshot.paramMap.get('category')!;
    const title = this.route.snapshot.paramMap.get('title')!;
    const link = `blog/${category}/${title}`;
    this.blog = this.blogService.getBlog(link);
  }

  ngAfterViewInit() {
    // Extract headings after the content is rendered
    this.extractHeadings();

    // Setup IntersectionObserver to track section visibility and highlight
    this.setupIntersectionObserver();
  }

  // Generate table of contents and assign IDs to each section
  extractHeadings() {
    const contentElement = document.querySelector('.blog-content');
    if (contentElement) {
      const headings = contentElement.querySelectorAll('h2, h3, h4'); // Assuming headings are h2, h3, h4
      this.sections = Array.from(headings).map((heading, index) => {
        const id = 'section-' + index;
        heading.id = id;  // Assign ID for each section
        return { title: heading.textContent || '', id: id };  // Ensure title is a string
      });
    }
  }

  // Setup IntersectionObserver to highlight the active section
  setupIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5, // Trigger when 50% of the section is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.activeSectionId = entry.target.id;
        }
      });
    }, options);

    // Observe all section headings
    this.sections.forEach((section) => {
      const sectionElement = document.getElementById(section.id);
      if (sectionElement) {
        observer.observe(sectionElement);
      }
    });
  }

  // Scroll to the specific section when clicking on the TOC
  scrollToSection(event: Event, sectionId: string) {
    event.preventDefault();  // Prevent default anchor behavior
    const sectionElement = document.getElementById(sectionId);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  formatContent(content: string): string {
    return content.split('\n').map(paragraph => `<p class="paragraph">${paragraph}</p>`).join('');
  }
}





