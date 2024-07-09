import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SlugifyService {
  slugify(text: string): string {
    const map: { [key: string]: string } = {
      'å': 'a', 'ä': 'a', 'ö': 'o',
      'Å': 'A', 'Ä': 'A', 'Ö': 'O',
    };
    return text
      .toLowerCase()
      .replace(/[åäöÅÄÖ]/g, (char) => map[char] || '') // Replace special characters using the map
      .replace(/[\s\W-]+/g, '-') // Replace spaces and non-word characters with dashes
      .replace(/[^a-z0-9-]/g, '') // Remove any remaining invalid characters
      .replace(/-+/g, '-') // Replace multiple dashes with a single dash
      .replace(/^-+|-+$/g, ''); // Remove leading and trailing dashes
  }
}
