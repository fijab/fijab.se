import { Component, Inject, LOCALE_ID } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { registerLocaleData } from '@angular/common';
import localeSv from '@angular/common/locales/sv';
import localeEn from '@angular/common/locales/en';

registerLocaleData(localeSv);
registerLocaleData(localeEn);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, HeaderComponent, FooterComponent, ContactFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'fijab-web';

  constructor(@Inject(LOCALE_ID) public locale: string = 'sv') {
    this.setInitialLocale();
  }

  setInitialLocale(): void {
    const currentLocale = localStorage.getItem('locale') || this.locale; // Use Swedish as default
    document.documentElement.lang = currentLocale;
  }

  switchLanguage(language: string): void {
    localStorage.setItem('locale', language);
    document.documentElement.lang = language;
    window.location.reload();
  }
}
