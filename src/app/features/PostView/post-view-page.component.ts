import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { QaComponent } from './qa/qa-componenet';

@Component({
  selector: 'app-post-view-page',
  standalone: true,
  imports: [CommonModule, CarouselModule, QaComponent],
  templateUrl: './post-view-page.component.html',
})
export class PostViewPageComponent {
  images: string[] = [
    '/assets/items/image1.png',
    '/assets/items/image2.png',
    '/assets/items/image3.png',
    '/assets/items/image4.png'
  ];
  
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
} 