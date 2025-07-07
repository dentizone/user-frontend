import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RatingModule } from 'primeng/rating';

@Component({
  selector: 'app-feedback-section',
  imports: [CommonModule, RatingModule, FormsModule, CarouselModule],
  templateUrl: './feedback-section.component.html',
  styleUrl: './feedback-section.component.css',
})
export class FeedbackSectionComponent {
  usersFeedback = [
    {
      id: '1',
      UserName: 'Ahmed',
      rating: 4,
      feedback: 'Great Experience',
    },
    {
      id: '2',
      UserName: 'Nourhane',
      rating: 5,
      feedback: 'Great Experience',
    },
    {
      id: '3',
      UserName: 'Mohamed',
      rating: 3,
      feedback: 'Great Experience',
    },
    {
      id: '4',
      UserName: 'Narnoura',
      rating: 4,
      feedback: 'Great Experience',
    },
    {
      id: '5',
      UserName: 'Mohamed',
      rating: 3,
      feedback: 'Great Experience',
    },
    {
      id: '6',
      UserName: 'Yaryoura',
      rating: 4,
      feedback: 'Great Experience',
    },
    {
      id: '7',
      UserName: 'Marioma',
      rating: 4,
      feedback: 'Great Experience',
    },
  ];

  customOptions: OwlOptions = {
    loop: true,
    margin: 16,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: false,
    dots: true,
    nav: false,
    navSpeed: 700,
    animateIn: 'fadeIn',
    animateOut: 'fadeOut',
    responsive: {
      0: { items: 1 },
      600: { items: 2 },
      900: { items: 3 },
      1200: { items: 4 },
    },
  };
}
