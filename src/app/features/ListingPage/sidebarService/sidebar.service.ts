import { Injectable } from '@angular/core';
import { SidebarData } from '../models/sidebar.interface';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  constructor() { }

  async getSidebar(): Promise<SidebarData> {
    try {
      const response = await fetch('https://apit.gitnasr.com/api/Posts/sidebar', {
        headers: {
          Authorization: 'Bearer YOUR_SECRET_TOKEN',
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return this.validateSidebarData(data);
    } catch (error) {
      console.error('Error fetching sidebar data:', error);
      // Return default data structure on error
      return {
        cities: [],
        categories: [],
        minPrice: 0,
        maxPrice: 100
      };
    }
  }

  private validateSidebarData(data: any): SidebarData {
    // Ensure the data has the expected structure
    return {
      cities: Array.isArray(data.cities) ? data.cities : [],
      categories: Array.isArray(data.categories) ? data.categories : [],
      minPrice: typeof data.minPrice === 'number' ? data.minPrice : 0,
      maxPrice: typeof data.maxPrice === 'number' ? data.maxPrice : 100
    };
  }
}
