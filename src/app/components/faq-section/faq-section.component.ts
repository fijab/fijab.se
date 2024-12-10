import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-faq-section',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <div class="mb-2 font-poppins rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white">
      <button
        type="button"
        [attr.aria-expanded]="isOpen"
        (click)="toggle()"
        class="flex w-full items-start justify-between text-left"
      >
        <h3 class="text-lg font-semibold">{{ question }}</h3>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="h-5 w-5 transition-all"
          [ngClass]="{'rotate-180': isOpen}"
        >
          <path d="m6 9 6 6 6-6"></path>
        </svg>
      </button>
      <div [hidden]="!isOpen">
        <p class="font-poppins mt-4 text-gray-500 dark:text-gray-400">{{ answer }}</p>
      </div>
    </div>
  `,
  styles: [`
    button:focus {
      outline: none;
    }
  `]
})
export class FaqSectionComponent {
  @Input() question: string = '';
  @Input() answer: string = '';
  isOpen: boolean = false;

  toggle() {
    this.isOpen = !this.isOpen;
  }
}



