import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterOptions, SidebarData } from '../../../models/sidebar.interface';
import { SidebarService } from '../../../sidebarService/sidebar.service';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, FormsModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  @Output() sidebarToggle = new EventEmitter<boolean>();
  @Output() filterChange = new EventEmitter<FilterOptions>();

  // Sidebar state
  isSidebarOpen = false;
  
  // Filter data
  sidebarData: SidebarData = {
    cities: [],
    categories: [],
    minPrice: 0,
    maxPrice: 100
  };
  
  // Active filters
  activeCategory = '';
  selectedCity = '';
  desiredPrice = 100;
  toDate: Date = new Date();
  private initialDate: Date = new Date();
  selectedConditions: string[] = [];
  sortBy = 'createdAtDesc';

  constructor(private sidebarService: SidebarService, private router: Router, private activatedRoute: ActivatedRoute) {}

  async ngOnInit() {
    this.initialDate = new Date();
    try {
      this.sidebarData = await this.sidebarService.getSidebar();
      this.initializeFilters();
      this.loadFiltersFromUrl();
    } catch (error) {
      console.error('Error loading sidebar:', error);
    }
  }

  private initializeFilters(): void {
    this.desiredPrice = this.sidebarData.maxPrice;
    this.activeCategory = this.sidebarData.categories[0]?.categoryName || '';
    this.selectedCity = this.sidebarData.cities[0] || '';
  }

  private loadFiltersFromUrl(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['category'] && this.sidebarData.categories.some(cat => cat.categoryName === params['category'])) {
        this.activeCategory = params['category'];
      }
      
      if (params['city'] && this.sidebarData.cities.includes(params['city'])) {
        this.selectedCity = params['city'];
      }
      
      if (params['price']) {
        const price = Number(params['price']);
        if (price >= this.sidebarData.minPrice && price <= this.sidebarData.maxPrice) {
          this.desiredPrice = price;
        }
      }
      
      if (params['toDate']) {
        this.toDate = new Date(params['toDate']);
      }
      
      if (params['conditions']) {
        this.selectedConditions = params['conditions'].split(',').filter((condition: string) => 
          ['New', 'As New', 'Used'].includes(condition)
        );
      }
      
      if (params['sortBy'] && ['createdAtAsc', 'createdAtDesc', 'priceAsc', 'priceDesc'].includes(params['sortBy'])) {
        this.sortBy = params['sortBy'];
      }
    });
  }

  private updateUrlParams(): void {
    const queryParams: any = {};
    
    if (this.activeCategory) {
      queryParams.category = this.activeCategory;
    }
    
    if (this.selectedCity) {
      queryParams.city = this.selectedCity;
    }
    
    if (this.desiredPrice !== this.sidebarData.maxPrice) {
      queryParams.price = this.desiredPrice;
    }
    
    if (this.toDate && this.toDate.getTime() !== this.initialDate.getTime()) {
      queryParams.toDate = this.toDate.toISOString().split('T')[0];
    }
    
    if (this.selectedConditions.length > 0) {
      queryParams.conditions = this.selectedConditions.join(',');
    }
    
    if (this.sortBy !== 'createdAtDesc') {
      queryParams.sortBy = this.sortBy;
    }
    
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: queryParams,
      queryParamsHandling: 'merge'
    });
  }

  openSideBar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
    this.sidebarToggle.emit(this.isSidebarOpen);
  }

  onSelectCategory(categoryName: string): void {
    this.activeCategory = categoryName;
    this.emitFilterChange();
  }

  onChangePriceRange(event: any): void {
    this.desiredPrice = Number(event.target.value);
    this.emitFilterChange();
  }

  onPriceInputChange(event: any): void {
    this.desiredPrice = Number(event.target.value);
    this.emitFilterChange();
  }

  onCityChange(): void {
    this.emitFilterChange();
  }

  onDateChange(): void {
    this.emitFilterChange();
  }

  onConditionChange(condition: string, checked: boolean): void {
    if (checked) {
      this.selectedConditions.push(condition);
    } else {
      this.selectedConditions = this.selectedConditions.filter(c => c !== condition);
    }
    this.emitFilterChange();
  }

  onCheckboxChange(condition: string, event: Event): void {
    const target = event.target as HTMLInputElement;
    this.onConditionChange(condition, target.checked);
  }

  onSortChange(): void {
    this.emitFilterChange();
  }

  onFilter(): void {
    this.emitFilterChange();
  }

  onSearch(): void {
    // This method can be implemented to handle search functionality
    this.emitFilterChange();
  }

  clearFilters(): void {
    this.activeCategory = this.sidebarData.categories[0]?.categoryName || '';
    this.selectedCity = this.sidebarData.cities[0] || '';
    this.desiredPrice = this.sidebarData.maxPrice;
    this.toDate = new Date();
    this.selectedConditions = [];
    this.sortBy = 'createdAtDesc';
    this.emitFilterChange();
  }

  private emitFilterChange(): void {
    const filters: FilterOptions = {
      category: this.activeCategory,
      city: this.selectedCity,
      price: this.desiredPrice,
      toDate: this.toDate,
      conditions: this.selectedConditions,
      sortBy: this.sortBy
    };
    
    this.updateUrlParams();
    this.filterChange.emit(filters);
  }

  // Getters for template
  get cities(): string[] {
    return this.sidebarData.cities;
  }

  get categories(): Array<{id: string; categoryName: string; icon: string}> {
    return this.sidebarData.categories;
  }

  get minPrice(): number {
    return this.sidebarData.minPrice;
  }

  get maxPrice(): number {
    return this.sidebarData.maxPrice;
  }
}
