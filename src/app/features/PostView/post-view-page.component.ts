import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { QaComponent } from './qa/qa-componenet';
import { ActivatedRoute } from '@angular/router';
import { ListingService } from '../ListingPage/listingService/listing.service';
import { QuillModule } from 'ngx-quill';
import { CartService } from '../Cart/cart.service';
import { FavsService } from '../favorites/favs.service';


@Component({
  selector: 'app-post-view-page',
  standalone: true,
  imports: [CommonModule, CarouselModule, QaComponent,QuillModule],
  templateUrl: './post-view-page.component.html',
})
export class PostViewPageComponent implements OnInit{
   showToast = false;
  images: string[] = [];
  product:any={}
  productID=''
  expirationDate!:Date
  formattedDate!:any
  isExpired!:boolean

  

  ngOnInit(): void {
    this.productID=this.route.snapshot.paramMap.get('id')!;
    if (this.productID) {
        this.loadPost();
      }
  }
  loadPost() {
    this.posts.getPostById(this.productID).subscribe({
      next: (data) =>{
        this.product = data;
        this.images= this.product.assets?.map((img: any) => img.url) || [];
        this.mainImage=this.images[0] || '';
        this.expirationDate = new Date(this.product.expireDate);
        this.formattedDate = this.expirationDate.toLocaleDateString('en-GB', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });

        this.isExpired = this.expirationDate.getTime() < new Date().getTime();
        console.log(this.product);
      },
      error: (err) => console.error('Error:', err)
    });
    
    console.log(this.images)
  }
  constructor(private route: ActivatedRoute,private posts: ListingService, private cartService:CartService, private favService:FavsService){}
  mainImage: string = this.images[0];
  activeIndex: number = 0;
  page: number = 0;
  isAuthenticated: boolean = false; // This should come from your auth service

  onPageChange(event: any) {
    this.activeIndex = event.page;
  }

  onThumbnailClick(index: number) {
    this.activeIndex = index;
    this.page = index;
  }

  questions = [
    {
      id: 1,
      username: 'Dr. Smith',
      text: 'Is this product still available?',
      time: '2 hours ago',
      answer: {
        id: 101,
        username: 'Seller',
        text: 'Yes, the product is still available. We have 5 units in stock.',
        time: '1 hour ago'
      }
    },
    {
      id: 2,
      username: 'Dr. Johnson',
      text: 'What is the expiration date?',
      time: '1 day ago',
      answer: {
        id: 201,
        username: 'Seller',
        text: 'The product expires in 6 months from the manufacturing date.',
        time: '12 hours ago'
      }
    },
    {
      id: 3,
      username: 'Dr. Williams',
      text: 'Can I get a bulk discount for 10 units?',
      time: '3 hours ago'
    }
  ];

  onQuestionSubmitted(question: string) {
    // Handle new question submission
    console.log('New question:', question);
    // Add API call here
  }

  onAnswerSubmitted(event: { questionId: number; answer: string }) {
    // Handle new answer submission
    console.log('New answer:', event);
    // Add API call here
  }
  onAddToCart(id:string){
    this.cartService.addToCart(id).subscribe({
      next:()=>
        console.log("added to cart")
      ,error:(err)=>{
        console.log("failed to add to cart",err);
      }
    });
  }
  onSelectFav(id:string) {
    this.favService.addToFavs(id).subscribe({
      next:()=>{console.log("added to favorites")
        this.showToast = true;
        setTimeout(() => {
          this.showToast = false;
        }, 3000);
      }
        
      ,error:(err)=>{
        console.log("failed to add to favorits",err);
      }
    });
}
} 