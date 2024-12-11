import { Component, HostListener, inject } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, TranslateModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isMenuOpen = false;
  currentLang = 'sv';

  constructor(private translate: TranslateService) {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  toggleLanguage() {
    const newLang = this.currentLang === 'sv' ? 'en' : 'sv';
    this.translate.use(newLang); 
    this.currentLang = newLang;

    if (this.isMenuOpen) {
      this.closeMenu();
    }
  }

  get displayLanguage(): string {
    return this.currentLang === 'sv' ? 'EN' : 'SV';
  }

  ngOnInit() {
    this.currentLang = this.translate.currentLang || 'sv'; // Set default language
  }
}





