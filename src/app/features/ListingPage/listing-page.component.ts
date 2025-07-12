import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaginatorModule } from 'primeng/paginator';
import { Post, PostsResponse } from '../../core/models/posts';
import { SeoService } from '../../core/services/seo.service';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { ToastComponent } from '../../shared/components/toast/toast.component';
import { SidebarComponent } from './components/sideBar/sidebar/sidebar.component';
import { ListingService } from './listingService/listing.service';
@Component({
  selector: 'app-listing-page',
  imports: [
    PaginatorModule,
    CommonModule,
    ProductCardComponent,
    SidebarComponent,
    ToastComponent,
  ],
  templateUrl: './listing-page.component.html',
})
export class ListingPageComponent implements OnInit {
  selectedCategory = '';
  selectedCity = '';
  desiredPrice!: number;
  toDate: Date = new Date();
  sortby = '';
  SortDirection!: boolean;
  selectedConditions: string[] = [];

  waitLoading = true;
  title = '';
  showToast = false;
  message = '';
  isSuccess = true;
  Toast(message: string) {
    this.message = message;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
      this.isSuccess = true;
    }, 3000);
  }
  handleToast(obj: { toast: boolean; message: string; isSuccess: boolean }) {
    this.showToast = obj.toast;
    this.message = obj.message;
    this.isSuccess = obj.isSuccess;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.selectedCategory = params['category'] ?? 'all';
      this.selectedCity = params['city'];
      this.desiredPrice = params['price'];
      this.toDate = params['toDate'];
      this.sortby = params['sortBy'];
      
      // Handle conditions parameter - it should be an array
      if (params['conditions']) {
        this.selectedConditions = params['conditions'].split(',');
      } else {
        this.selectedConditions = [];
      }
      
      this.title = params['category'] ?? 'All Categories';

      if (this.selectedCategory && this.desiredPrice) {
        this.waitLoading = false;
        this.loadItems();
      } else {
        setTimeout(() => {
          this.waitLoading = false;
          this.loadItems();
        }, 1000);
      }
    });
    this.seo.setMetaTags({
      title: 'Marketplace | Dentizone',
      description:
        'Browse and find dental items in the Dentizone marketplace for dentist students in Egypt.',
      keywords: 'marketplace, dentizone, dental items, Egypt',
    });
  }

  loadItems() {
    this.waitLoading = true;
    let condition;
    // Only apply condition filter if conditions are selected
    if (this.selectedConditions.length > 0) {
      if (this.selectedConditions.includes('New')) {
        condition = 0;
      } else if (this.selectedConditions.includes('Used')) {
        condition = 1;
      }
      // If both or other conditions are selected, we might need different logic
      // For now, prioritize 'New' if both are selected
    }
    // If no conditions are selected, don't filter by condition (undefined will not be sent to backend)
    
    if (this.selectedCity == 'all' || this.selectedCity == undefined) {
      this.selectedCity = '';
    }

    let sortField = '';
    let sortDirection = true;
    switch (this.sortby) {
      case 'createdAtAsc':
        sortField = 'createdAt';
        sortDirection = false; // Oldest First (ascending by date should be false)
        break;
      case 'createdAtDesc':
        sortField = 'createdAt';
        sortDirection = true; // Newest First (descending by date should be true)
        break;
      case 'priceAsc':
        sortField = 'price';
        sortDirection = true; // Lowest First
        break;
      case 'priceDesc':
        sortField = 'price';
        sortDirection = false; // Highest First
        break;
      default:
        // No additional sorting, use default sortField and sortDirection
        break;
    }

    if (!this.desiredPrice && this.sidebarComponent) {
      this.desiredPrice = this.sidebarComponent.maxPrice;
    }
    if (this.selectedCategory == 'all') {
      this.selectedCategory = '';
    }

    // Include pagination in request
    const body: any = {
      category: this.selectedCategory,
      city: this.selectedCity,
      MaxPrice: this.desiredPrice,
      SortBy: sortField,
      SortDirection: sortDirection,
      keyword: this.sidebarComponent ? this.sidebarComponent.keyword : '',
      PageNumber: this.currentPage,
    };
    
    // Only include Condition if a condition is actually selected
    if (condition !== undefined) {
      body.Condition = condition;
    }
    
    this.posts.getPostsByCategory(body).subscribe({
      next: (data: PostsResponse) => {
        this.Products = data.items;
        this.totalPages = data.totalPages;
        this.updatePages();
        this.waitLoading = false;
      },
      error: (err) => {
        console.error('Error:', err);
        this.waitLoading = false;
      },
    });
  }
  @ViewChild(SidebarComponent) sidebarComponent!: SidebarComponent;

  Products: Post[] = [];
  currentPage = 1;
  pageSize = 10;
  totalPages = 0;
  pages: number[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly posts: ListingService,
    private seo: SeoService
  ) {
    this.updatePages(); // initialize pagination
  }

  updatePages() {
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.loadItems();
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

  onFilterChange(filters: any) {
    this.waitLoading = true;
    this.currentPage = 1; // Reset pagination to first page on filter change
    this.selectedCategory = filters.category;
    this.selectedCity = filters.city;
    this.desiredPrice = filters.price;
    this.toDate = filters.toDate;
    this.sortby = filters.sortBy;
    this.selectedConditions = filters.conditions;
  }
}
