import { CommonModule } from '@angular/common';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePicker } from 'primeng/datepicker';
import { SidebarService } from '../../../sidebarService/sidebar.service';
import { SidebarData, FilterOptions } from '../../../models/sidebar.interface';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, FormsModule, DatePicker],
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
  fromDate: Date = new Date();
  toDate: Date = new Date();
  selectedConditions: string[] = [];
  sortBy = 'createdAtDesc';

  constructor(private sidebarService: SidebarService) {}

  async ngOnInit() {
    try {
      this.sidebarData = await this.sidebarService.getSidebar();
      this.initializeFilters();
    } catch (error) {
      console.error('Error loading sidebar:', error);
    }
  }

  private initializeFilters(): void {
    this.desiredPrice = this.sidebarData.maxPrice;
    this.activeCategory = this.sidebarData.categories[0]?.categoryName || '';
    this.selectedCity = this.sidebarData.cities[0] || '';
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
  }

  onPriceInputChange(event: any): void {
    this.desiredPrice = Number(event.target.value);
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

  private emitFilterChange(): void {
    const filters: FilterOptions = {
      category: this.activeCategory,
      city: this.selectedCity,
      price: this.desiredPrice,
      fromDate: this.fromDate,
      toDate: this.toDate,
      conditions: this.selectedConditions,
      sortBy: this.sortBy
    };
    
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
