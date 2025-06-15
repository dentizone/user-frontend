import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  constructor() { }
   async getSidebar(): Promise<any> {
    const response = await fetch('https://apit.gitnasr.com/api/Posts/sidebar', {
      headers: {
        Authorization: 'Bearer YOUR_SECRET_TOKEN',
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch sidebar posts');
    }

    return await response.json();
  }
}
