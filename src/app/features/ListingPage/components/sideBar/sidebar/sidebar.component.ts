import { CommonModule } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePicker } from 'primeng/datepicker';
import { SidebarService } from '../../../sidebarService/sidebar.service';
@Component({
  selector: 'app-sidebar',
  imports: [CommonModule,FormsModule,DatePicker],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{
  sidebarObject={
    cities: [],
    categories: [{id:'',
      categoryName:'',
      icon:''}],
    minPrice: 0,
    maxPrice: 0
  }
  minPrice=0;
  maxPrice=100;
  categories=[
    {id:'123456789',
      categoryName:'Category1',
      icon:''
    }]
    
  activeCategory='Category1'
  constructor(private sidebarService: SidebarService) {}
  cities = [];
  async ngOnInit() {
    try {
      this.sidebarObject = await this.sidebarService.getSidebar();
    } catch (error) {
      console.error('Error loading sidebar posts:', error);
    }
    this.cities=this.sidebarObject.cities;
    this.minPrice=this.sidebarObject.minPrice;
    this.maxPrice=this.sidebarObject.maxPrice;
    this.desiredPrice=this.maxPrice;
    this.categories=this.sidebarObject.categories;
    this.activeCategory=this.categories[0].categoryName;
  }
  selectedCity=''

  isSidebarOpen=false
  openSideBar(){
    this.isSidebarOpen=!this.isSidebarOpen;
    
  }
  //Expiry date

  fromDate:Date=new Date();
  toDate:Date=new Date();
  //price
  
  desiredPrice=100;
  onChangePriceRange(e:any){
    this.desiredPrice=e.target.value;
    console.log(this.desiredPrice);
  }


  //categories
  
  onSelectCategory(name:string){
    this.activeCategory=name
  }
}
