import { CommonModule } from '@angular/common';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePicker } from 'primeng/datepicker';
import { SidebarService } from '../../../sidebarService/sidebar.service';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule,FormsModule,DatePicker],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  @Output() sidebarToggle = new EventEmitter<boolean>();

  sidebarObject = {
    cities: [],
    categories: [{id:'',
      categoryName:'',
      icon:''}],
    minPrice: 0,
    maxPrice: 0
  }
  
  minPrice = 0;
  maxPrice = 100;
  categories = [
    {id:'123456789',
      categoryName:'Category1',
      icon:''
    }
  ]
    
  activeCategory = 'Category1'
  selectedCity = ''
  isSidebarOpen = false
  
  // Expiry date
  fromDate: Date = new Date();
  toDate: Date = new Date();
  
  // Price
  desiredPrice = 100;
  
  cities = [];

  constructor(private sidebarService: SidebarService) {}

  async ngOnInit() {
    try {
      this.sidebarObject = await this.sidebarService.getSidebar();
    } catch (error) {
      console.error('Error loading sidebar:', error);
    }
    this.cities = this.sidebarObject.cities;
    this.minPrice = this.sidebarObject.minPrice;
    this.maxPrice = this.sidebarObject.maxPrice;
    this.desiredPrice = this.maxPrice;
    this.categories = this.sidebarObject.categories;
    this.activeCategory = this.categories[0].categoryName;
  }

  openSideBar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    this.sidebarToggle.emit(this.isSidebarOpen);
  }

  onChangePriceRange(e: any) {
    this.desiredPrice = e.target.value;
    console.log(this.desiredPrice);
  }

  onSelectCategory(name: string) {
    this.activeCategory = name;
  }
}
