import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-faq-section',
  templateUrl: './faq-section.component.html',
  styleUrls: ['./faq-section.component.css'],
  standalone: true,
  imports: [CommonModule]  
})

export class FaqSectionComponent {
  faqs = [
    { id: 1, question: 'Hur lång tid tar det att bygga en hemsida?', answer: 'Tiden det tar att utveckla en webbplats kan variera...', isOpen: false },
    { id: 2, question: 'Vilka tjänster erbjuder ni utöver webbutveckling?', answer: 'Vi erbjuder en fullständig uppsättning webblösningar, inklusive...', isOpen: false },
    { id: 3, question: 'Hur involverad behöver jag vara i utvecklingsprocessen?', answer: 'Ditt engagemang är avgörande för en framgångsrik projektutveckling...', isOpen: false }
  ];

  toggleFaq(id: number): void {
    const faq = this.faqs.find(f => f.id === id);
    if (faq) {
      faq.isOpen = !faq.isOpen;
    } else {
      console.error('FAQ not found!');
    }
  }
}



