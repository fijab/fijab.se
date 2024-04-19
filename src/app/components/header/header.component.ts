import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [RouterModule]
})
export class HeaderComponent {
  isMenuVisible = false;

  toggleMenu(): void {
    this.isMenuVisible = !this.isMenuVisible;
  }
}
