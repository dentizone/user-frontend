import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaginatorModule } from 'primeng/paginator';
import { Posts } from '../../core/models/posts';
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
  selectedConditions: string = '';

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
      this.selectedConditions = params['conditions'];
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
  }

  loadItems() {
    this.waitLoading = true;
    let condition;
    if (this.selectedConditions == 'New') {
      condition = 0;
    } else {
      condition = 1;
    }
    if (this.selectedCity == 'all' || this.selectedCity == undefined) {
      this.selectedCity = '';
    }

    let sortField = '';
    let sortDirection = true;
    switch (this.sortby) {
      case 'createdAtAsc':
        sortField = 'createdAt';
        sortDirection = true;
        break;
      case 'createdAtDesc':
        sortField = 'createdAt';
        sortDirection = false;
        break;
      case 'priceAsc':
        sortField = 'price';
        sortDirection = true;
        break;
      case 'priceDesc':
        sortField = 'price';
        sortDirection = false;
        break;
      default:
        sortField = '';
        sortDirection = true;
        break;
    }

    if (!this.desiredPrice && this.sidebarComponent) {
      this.desiredPrice = this.sidebarComponent.maxPrice;
    }
    if (this.selectedCategory == 'all') {
      this.selectedCategory = '';
    }

    let body = {
      category: this.selectedCategory,
      city: this.selectedCity,
      MaxPrice: this.desiredPrice,
      Condition: condition,
      SortBy: sortField,
      SortDirection: sortDirection,
      keyword: this.sidebarComponent ? this.sidebarComponent.keyword : '',
    };
    this.posts.getPostsByCategory(body).subscribe({
      next: (data) => {
        this.clinicalproduct = data;
        this.waitLoading = false;
      },
      error: (err) => {
        console.error('Error:', err);
        this.waitLoading = false;
      },
    });
  }
  @ViewChild(SidebarComponent) sidebarComponent!: SidebarComponent;

  clinicalproduct: Posts[] = [];
  currentPage = 1;
  totalPages = 5;
  pages: number[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly posts: ListingService
  ) {
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

  onFilterChange(filters: any) {
    this.waitLoading = true;
    this.selectedCategory = filters.category;
    this.selectedCity = filters.city;
    this.desiredPrice = filters.price;
    this.toDate = filters.toDate;
    this.sortby = filters.sortBy;
    this.selectedConditions = filters.conditions;
    // Do NOT call loadItems here; let queryParams subscription handle it
  }
}
