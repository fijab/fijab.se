import { Component, EventEmitter, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';  
import { SharedTranslateModule } from '../../modules/shared-translate.module'; 

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [
    RouterModule, 
    CommonModule,
    SharedTranslateModule  
  ]
})
export class HeaderComponent {
  @Output() languageChange = new EventEmitter<string>();

  localesList = [
    { code: 'sv', label: 'Svenska'},
    { code: 'en', label: 'English'}
  ];
  isMenuVisible = false;
  isMobileLanguageSwitcherVisible = false;

  constructor(private translate: TranslateService) {  
    this.translate.setDefaultLang('en');  
  }

  toggleMenu(): void {
    this.isMenuVisible = !this.isMenuVisible;
    this.isMobileLanguageSwitcherVisible = this.isMenuVisible; 
  }

  switchLanguage(language: string): void {
    console.log('Attempting to switch language to:', language);
    this.translate.use(language);
    localStorage.setItem('locale', language);
    document.documentElement.lang = language;
    console.log('Language after switch:', this.translate.currentLang);
  }
}


