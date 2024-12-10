import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { CookieConsentComponent } from './components/cookie-consent/cookie-consent.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    RouterModule, 
    HeaderComponent, 
    FooterComponent, 
    ContactFormComponent,
    CookieConsentComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']  
})
export class AppComponent {
  title = 'fijab-web';
  constructor(private translate: TranslateService) {
    const defaultLang = 'sv';
    translate.setDefaultLang(defaultLang);
    translate.use(defaultLang);
  }
  
}

