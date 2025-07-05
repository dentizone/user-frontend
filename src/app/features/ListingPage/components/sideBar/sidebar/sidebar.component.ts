import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { FilterOptions, SidebarData } from '../../../models/sidebar.interface';
import { SidebarService } from '../../../sidebarService/sidebar.service';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, FormsModule],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit, OnDestroy {
  @Output() sidebarToggle = new EventEmitter<boolean>();
  @Output() filterChange = new EventEmitter<FilterOptions>();

  // Sidebar state
  isSidebarOpen = false;

  // Filter data
  sidebarData: SidebarData = {
    cities: [],
    categories: [],
    minPrice: 0,
    maxPrice: 100,
  };

  // Active filters
  activeCategory = '';
  selectedCity = '';
  desiredPrice = 100;
  toDate: Date = new Date();
  private initialDate: Date = new Date();
  selectedConditions: string[] = [];
  sortBy = 'createdAtDesc';
  keyword = '';

  private readonly destroy$ = new Subject<void>();
  private searchDebounceTimer: any;

  constructor(
    private readonly sidebarService: SidebarService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    (async () => {
      this.initialDate = new Date();
      try {
        this.sidebarData = await this.sidebarService.getSidebar();
        this.initializeFilters();
        // If no query params, set defaults in URL
        const params = this.activatedRoute.snapshot.queryParams;
        const today = new Date().toISOString().split('T')[0];
        if (!params['category'] && !params['city'] && !params['toDate']) {
          this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: {
              category: 'all',
              city: 'all',
              toDate: today
            },
            queryParamsHandling: 'merge',
          });
        }
        this.loadFiltersFromUrl();
      } catch (error) {
        console.error('Error loading sidebar:', error);
      }
    })();
  }

  private initializeFilters(): void {
    this.desiredPrice = this.sidebarData.maxPrice;
    // Prefer 'all' if present, otherwise first category
    const allCategory = this.sidebarData.categories.find(cat => cat.categoryName?.toLowerCase() === 'all');
    this.activeCategory = allCategory ? allCategory.categoryName : this.sidebarData.categories[0]?.categoryName ?? '';
    this.selectedCity = 'all';
  }

  private loadFiltersFromUrl(): void {
    this.activatedRoute.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        if (params['category']) {
          this.activeCategory = params['category'];
        }

        if (
          params['city'] &&
          this.sidebarData.cities.includes(params['city'])
        ) {
          this.selectedCity = params['city'];
        }

        if (params['price']) {
          const price = Number(params['price']);
          if (
            price >= this.sidebarData.minPrice &&
            price <= this.sidebarData.maxPrice
          ) {
            this.desiredPrice = price;
          }
        }

        if (params['toDate']) {
          this.toDate = new Date(params['toDate']);
        }

        if (params['conditions']) {
          this.selectedConditions = params['conditions']
            .split(',')
            .filter((condition: string) =>
              ['New', 'As New', 'Used'].includes(condition)
            );
        }

        if (
          params['sortBy'] &&
          ['createdAtAsc', 'createdAtDesc', 'priceAsc', 'priceDesc'].includes(
            params['sortBy']
          )
        ) {
          this.sortBy = params['sortBy'];
        }

        if (params['searchKeyword']) {
          this.keyword = params['searchKeyword'];
        }
      });
  }

  private updateUrlParams(): void {
    // Build queryParams from scratch
    const queryParams: any = {};

    queryParams['category'] = this.activeCategory;
    queryParams['city'] = this.selectedCity;
    if (this.desiredPrice !== this.sidebarData.maxPrice) {
      queryParams['price'] = this.desiredPrice;
    }
    if (this.toDate && this.toDate.getTime() !== this.initialDate.getTime()) {
      queryParams['toDate'] = this.toDate.toISOString().split('T')[0];
    }
    if (this.selectedConditions.length > 0) {
      queryParams['conditions'] = this.selectedConditions.join(',');
    }
    if (this.sortBy !== 'createdAtDesc') {
      queryParams['sortBy'] = this.sortBy;
    }
    if (this.keyword) {
      queryParams['searchKeyword'] = this.keyword;
    }
    console.debug('[updateUrlParams] keyword:', this.keyword, 'queryParams:', queryParams);
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: queryParams
      // No queryParamsHandling: 'merge' here
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
      this.selectedConditions = this.selectedConditions.filter(
        (c) => c !== condition
      );
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
    console.log(this.keyword);
  }

  onSearchDebounced() {
    if (this.searchDebounceTimer) {
      clearTimeout(this.searchDebounceTimer);
    }
    this.searchDebounceTimer = setTimeout(() => {
      this.onSearch();
    }, 400);
  }

  clearFilters(): void {
    this.activeCategory = this.sidebarData.categories[0]?.categoryName ?? '';
    this.selectedCity = this.sidebarData.cities[0] ?? '';
    this.desiredPrice = this.sidebarData.maxPrice;
    this.toDate = new Date();
    this.selectedConditions = [];
    this.sortBy = 'createdAtDesc';
    this.keyword = '';
    this.emitFilterChange();
  }

  private emitFilterChange(): void {
    const filters: FilterOptions = {
      category: this.activeCategory,
      city: this.selectedCity,
      price: this.desiredPrice,
      toDate: this.toDate,
      conditions: this.selectedConditions,
      sortBy: this.sortBy,
      keyword: this.keyword,
    };

    this.updateUrlParams();
    this.filterChange.emit(filters);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.searchDebounceTimer) {
      clearTimeout(this.searchDebounceTimer);
    }
  }

  // Getters for template
  get cities(): string[] {
    return this.sidebarData.cities;
  }

  get categories(): Array<{ id: string; categoryName: string; icon: string }> {
    return this.sidebarData.categories;
  }

  get minPrice(): number {
    return this.sidebarData.minPrice;
  }

  get maxPrice(): number {
    return this.sidebarData.maxPrice;
  }

  onCategoryKeyDown(event: KeyboardEvent, categoryName: string): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.onSelectCategory(categoryName);
    }
  }

  isMobile(): boolean {
    return window.innerWidth < 1024;
  }

  closeSidebar(): void {
    this.isSidebarOpen = false;
    this.sidebarToggle.emit(this.isSidebarOpen);
  }

  clearSearch() {
    this.keyword = '';
    console.debug('[clearSearch] keyword after clear:', this.keyword);
    this.emitFilterChange();
  }
}
