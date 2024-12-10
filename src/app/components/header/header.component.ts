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
    this.currentLang = this.currentLang === 'en' ? 'sv' : 'en';
    this.translate.use(this.currentLang); // Update ngx-translate language
  }

  ngOnInit() {
    this.currentLang = this.translate.currentLang || 'sv'; // Set default language
  }
}





