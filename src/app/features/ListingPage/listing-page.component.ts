import { CommonModule } from '@angular/common';
import { Component, ViewChild, OnInit, afterNextRender } from '@angular/core';
import { PaginatorModule } from 'primeng/paginator';
import { Posts } from '../../core/models/posts';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { SidebarComponent } from './components/sideBar/sidebar/sidebar.component';
import { ActivatedRoute } from '@angular/router';
import { ListingService } from './listingService/listing.service';
import { ToastComponent } from "../../shared/components/toast/toast.component";
import { LoaderComponent } from '../../shared/components/loader/loader.component';
@Component({
  selector: 'app-listing-page',
  imports: [PaginatorModule, CommonModule, ProductCardComponent, SidebarComponent, ToastComponent,LoaderComponent],
  templateUrl: './listing-page.component.html',
})
export class ListingPageComponent implements OnInit{

  selectedCategory='';
  selectedCity = '';
  desiredPrice!:number
  toDate: Date = new Date();
  sortby=''
  SortDirection!:boolean;
  private initialDate: Date = new Date();
  selectedConditions: string='';

  waitLoading=true;
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
  handleToast(obj: { toast: boolean, message: string }) {
    this.showToast = obj.toast;
    this.message = obj.message;
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
    
      if (this.selectedCategory && this.desiredPrice) {
        this.waitLoading=false
        this.loadItems();
      }else{
        setTimeout(() => {
          this.waitLoading=false;
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
    if (this.selectedCity == 'all' || this.selectedCity == undefined) { this.selectedCity = ''; }

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

    if (!this.desiredPrice && this.sidebarComponent) { this.desiredPrice = this.sidebarComponent.maxPrice; }
    if (this.selectedCategory == 'all') { this.selectedCategory = ''; }

    let body = {
      category: this.selectedCategory,
      city: this.selectedCity,
      MaxPrice: this.desiredPrice,
      Condition: condition,
      SortBy: sortField,
      SortDirection: sortDirection,
      keyword: this.sidebarComponent ? this.sidebarComponent.keyword : ''
    };
    this.waitLoading = false;
    this.posts.getPostsByCategory(body).subscribe({
      next: (data) => this.clinicalproduct = data,
      error: (err) => console.error('Error:', err)
    });
    console.log(this.clinicalproduct);
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
    console.log(this.clinicalproduct);
  }

  onSidebarToggle(isOpen: boolean) {
    // Handle sidebar toggle event if needed
    console.log('Sidebar is now:', isOpen ? 'open' : 'closed');
  }
}
