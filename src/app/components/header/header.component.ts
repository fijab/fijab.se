import { Component, HostListener, inject } from '@angular/core';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isMenuOpen = false;
  isEnglish = false; // Set default to Swedish

  private router = inject(Router);

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  toggleLanguage() {
    this.isEnglish = !this.isEnglish;
    const newLang = this.isEnglish ? 'en' : 'sv';
    const currentUrl = this.router.url.replace(/\/(sv|en)/, `/${newLang}`);
    this.router.navigateByUrl(currentUrl)
      .then(() => {
        location.reload();
      });
  }  

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const menuButton = document.querySelector('.menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (this.isMenuOpen && !mobileMenu?.contains(target) && !menuButton?.contains(target)) {
      this.closeMenu();
    }
  }

  ngOnInit() {
    const currentLang = this.router.url.includes('en') ? 'en' : 'sv';
    this.isEnglish = currentLang === 'en';
  }
}





