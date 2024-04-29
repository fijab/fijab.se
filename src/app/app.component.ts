import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import localeSv from '@angular/common/locales/sv';
import localeEn from '@angular/common/locales/en';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeSv);
registerLocaleData(localeEn);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, HeaderComponent, FooterComponent, ContactFormComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']  
})
export class AppComponent {
  title = 'fijab-web';

  constructor(
    private translate: TranslateService  
  ) {
    this.initDefaultLanguage();
  }

  initDefaultLanguage(): void {
    const storedLang = localStorage.getItem('locale') || this.translate.getBrowserLang();
    const browserLang = storedLang ? storedLang : 'sv';
    this.translate.setDefaultLang('sv');
    this.translate.use(browserLang.match(/en|sv/) ? browserLang : 'sv');
  }

  switchLanguage(language: string): void {
    localStorage.setItem('locale', language);
    document.documentElement.lang = language;
    this.translate.use(language);  
  }
}

