import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  standalone: true,
  imports: [TranslateModule],
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent {
  name: string = '';
  email: string = '';
  mobile: string = '';
  message: string = '';

  onSubmit() {
    console.log('Name:', this.name);
    console.log('Email:', this.email);
    console.log('Mobile:', this.mobile);
    console.log('Message:', this.message);
  }
  
  
}
