import { CommonModule } from '@angular/common';
import { Component, ViewChild, OnInit } from '@angular/core';
import { PaginatorModule } from 'primeng/paginator';
import { Posts } from '../../core/models/posts';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { SidebarComponent } from './components/sideBar/sidebar/sidebar.component';
import { ActivatedRoute } from '@angular/router';
import { ListingService } from './listingService/listing.service';
@Component({
  selector: 'app-listing-page',
  imports: [PaginatorModule, CommonModule, ProductCardComponent,SidebarComponent],
  templateUrl: './listing-page.component.html',
})
export class ListingPageComponent implements OnInit{
  selectedCategory=''
  title=''
  ngOnInit(): void {
    
   this.route.queryParams.subscribe(params => {
      this.selectedCategory = params['category'];
      this.title=params['category'];
      if (this.selectedCategory) {
        this.loadItems();
      }else{

      }
    });
  }

  loadItems() {
    this.posts.getPostsByCategory(this.selectedCategory).subscribe({
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
