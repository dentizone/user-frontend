import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { PaginatorModule } from 'primeng/paginator';
import { Posts } from '../../core/models/posts';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { SidebarComponent } from './components/sideBar/sidebar/sidebar.component';

@Component({
  selector: 'app-listing-page',
  imports: [PaginatorModule, CommonModule, ProductCardComponent,SidebarComponent],
  templateUrl: './listing-page.component.html',
})
export class ListingPageComponent {
  @ViewChild(SidebarComponent) sidebarComponent!: SidebarComponent;

  clinicalproduct: Posts[] = [
    {
      title: 'MANI K FILES ( SIZE 6 )',
      id: 'item-1',
      description:
        'Lorem ipsum is placeholder text commonly used in the mockups.',
      price: '170',
      imagesrc: '/assets/items/image1.png',
      rating: '3.5',
    },
    {
      title: 'Alphasil Rubber Base impression kit',
      id: 'item-2',
      description:
        'Lorem ipsum is placeholder text commonly used in the mockups.',
      price: '1700',
      imagesrc: '/assets/items/image2.png',
      rating: '3.5',
    },
    {
      title: 'Calibra Veneer Esthetic Resin',
      id: 'item-3',
      description:
        'Lorem ipsum is placeholder text commonly used in the mockups.',
      price: '2650',
      imagesrc: '/assets/items/image3.png',
      rating: '3.5',
    },
    {
      title: 'Ultradent PermaFlo-A1',
      id: 'item-4',
      description:
        'Lorem ipsum is placeholder text commonly used in the mockups.',
      price: '900',
      imagesrc: '/assets/items/image4.png',
      rating: '3.5',
    },
  ];
  currentPage = 1;
  totalPages = 5;
  pages: number[] = [];

  constructor() {
    this.updatePages();
  }

  updatePages() {
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }

  toggleSidebar() {
    if (this.sidebarComponent) {
      this.sidebarComponent.openSideBar();
    }
  }

  onSidebarToggle(isOpen: boolean) {
    // Handle sidebar toggle event if needed
    console.log('Sidebar is now:', isOpen ? 'open' : 'closed');
  }
}
