import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cookie-consent',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cookie-consent.component.html',
  styleUrls: ['./cookie-consent.component.css']
})
export class CookieConsentComponent implements OnInit {
  isVisible = true;

  constructor() { }

  ngOnInit(): void {
    const consent = localStorage.getItem('cookieConsent');
    if (consent) {
      this.isVisible = false;
    }
  }

  acceptCookies() {
    localStorage.setItem('cookieConsent', 'true');
    this.isVisible = false;
  }
}
