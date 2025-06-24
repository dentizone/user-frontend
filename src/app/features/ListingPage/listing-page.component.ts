import { CommonModule } from '@angular/common';
import { Component, ViewChild, OnInit, afterNextRender } from '@angular/core';
import { PaginatorModule } from 'primeng/paginator';
import { Posts } from '../../core/models/posts';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { SidebarComponent } from './components/sideBar/sidebar/sidebar.component';
import { ActivatedRoute } from '@angular/router';
import { ListingService } from './listingService/listing.service';
import { ToastComponent } from "../../shared/components/toast/toast.component";
@Component({
  selector: 'app-listing-page',
  imports: [PaginatorModule, CommonModule, ProductCardComponent, SidebarComponent, ToastComponent],
  templateUrl: './listing-page.component.html',
})
export class ListingPageComponent implements OnInit{

  selectedCategory='';
  selectedCity = '';
  desiredPrice!:number
  toDate: Date = new Date();
  sortby=''
  private initialDate: Date = new Date();
  selectedConditions: string='';

  title=''
  showToast=false;
  message=''
  Toast(message:string){
    this.message=message;
    this.showToast = true;
        setTimeout(() => {
          this.showToast = false;
        }, 3000);
  }
  handleToast(obj:{toats: boolean,message:string}) {
    this.showToast=obj.toats
    this.message=obj.message
  }
  
  ngOnInit(): void {
    
   this.route.queryParams.subscribe(params => {
      this.selectedCategory = params['category'];
      this.selectedCity=params['city'];
      this.desiredPrice = params['price'];
      this.toDate=params['toDate']
      this.sortby=params['sortBy']
      this.selectedConditions=params['conditions']
      this.title=params['category'];
      if (this.selectedCategory) {
        this.loadItems();
      }else{

      }
    });
  }
  
  loadItems() {
    let condition
    if(this.selectedConditions=='New'){
      condition=0;
    }else{
      condition=1;
    }
    if(this.selectedCity=='all'){this.selectedCity=''}
    let body={
      category:this.selectedCategory,
      city:this.selectedCity,
      MaxPrice:this.desiredPrice,
      Condition:condition,
      //SortBy:this.sortby
    }
    this.posts.getPostsByCategory(body).subscribe({
      next: (data) => this.clinicalproduct = data,
      error: (err) => console.error('Error:', err)
    });
    console.log(this.clinicalproduct)
  }
  @ViewChild(SidebarComponent) sidebarComponent!: SidebarComponent;

  clinicalproduct: Posts[] = [];
  currentPage = 1;
  totalPages = 5;
  pages: number[] = [];

  constructor(private route: ActivatedRoute,private posts: ListingService) {
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
    console.log(this.clinicalproduct)
  }

  onSidebarToggle(isOpen: boolean) {
    // Handle sidebar toggle event if needed
    console.log('Sidebar is now:', isOpen ? 'open' : 'closed');
  }
}
