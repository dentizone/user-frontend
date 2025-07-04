import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuillModule } from 'ngx-quill';
import { CarouselModule } from 'primeng/carousel';
import { ToastComponent } from '../../shared/components/toast/toast.component';
import { CartService } from '../Cart/cart.service';
import { FavsService } from '../favorites/favs.service';
import { ListingService } from '../ListingPage/listingService/listing.service';
import { QaComponent } from './qa/qa-componenet';
import { QAService } from './service/qa.service';

@Component({
  selector: 'app-post-view-page',
  standalone: true,
  imports: [
    CommonModule,
    CarouselModule,
    QaComponent,
    QuillModule,
    ToastComponent,
  ],
  templateUrl: './post-view-page.component.html',
})
export class PostViewPageComponent implements OnInit {
  [x: string]: any;
  showToast = false;
  message = '';
  isSuccess = true;

  images: string[] = [];
  product: any = {};
  productID = '';
  expirationDate!: Date;
  formattedDate!: any;
  isExpired!: boolean;

  Toast(message: string) {
    this.message = message;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
      this.isSuccess = true;
    }, 3000);
  }

  handleToast(event: { message: string; isSuccess: boolean }) {
    this.isSuccess = event.isSuccess;
    this.Toast(event.message);
  }
  ngOnInit(): void {
    this.productID = this.route.snapshot.paramMap.get('id')!;
    if (this.productID) {
      this.loadPost();
    }
  }

  loadPost() {
    this.posts.getPostById(this.productID).subscribe({
      next: (data) => {
        this.product = data;
        this.images = this.product.assets?.map((img: any) => img.url) ?? [];
        this.mainImage = this.images[0] ?? '';
        this.expirationDate = new Date(this.product.expireDate);
        this.formattedDate = this.expirationDate.toLocaleDateString('en-GB', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        });

        this.isExpired = this.expirationDate.getTime() < new Date().getTime();
      },
      error: (err) => console.error('Error:', err),
    });
  }
  constructor(
    private route: ActivatedRoute,
    private posts: ListingService,
    private cartService: CartService,
    private favService: FavsService,
    private qaService: QAService
  ) {}
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
      answer: {
        createdAt: '',
        id: '',
        responderName: '',
        text: '',
      },
      askerName: '',
      createdAt: '',
      id: '',
      text: '',
    },
  ];

  onQuestionSubmitted(question: string) {
    // Handle new question submission
    console.log('New question:', question);
    // Add API call here
  }

  onAnswerSubmitted(event: { questionId: string; answer: string }) {
    // Handle new answer submission
    console.log('New answer:', event);
    // Add API call here
  }
  onAddToCart(id: string) {
    this.cartService.addToCart(id).subscribe({
      next: () => {
        this.Toast('Product added to cart!');
      },
      error: (err) => {
        console.log('failed to add to cart', err);
        this.isSuccess = false;
        if (err.status == 403) {
          this.Toast('You are not authorized to do this action');
        } else {
          this.Toast(err.error.Message);
        }
      },
    });
  }
  onSelectFav(id: string) {
    this.favService.addToFavs(id).subscribe({
      next: () => {
        this.Toast('Product added to favorites!');
      },

      error: (err) => {
        console.log('failed to add to favorits', err);
        this.isSuccess = false;
        if (err.status == 403) {
          this.Toast('You are not authorized to do this action');
        } else {
          this.Toast(err.error.Message);
        }
      },
    });
  }
}
