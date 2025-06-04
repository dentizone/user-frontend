import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';

@Component({
  selector: 'app-feedback-section',
  imports: [RatingModule, FormsModule],
  templateUrl: './feedback-section.component.html',
  styleUrl: './feedback-section.component.css',
})
export class FeedbackSectionComponent {
  usersFeedback = [
    {
      userAvatar: '/assets/avatar/dentist.png',
      UserName: 'Ahmed',
      rating: 4,
      feedback: 'Great Experience',
    },
    {
      userAvatar: '/assets/avatar/tooth-extraction.png',
      UserName: 'Nourhane',
      rating: 5,
      feedback: 'Great Experience',
    },
    {
      userAvatar: '/assets/avatar/dentist.png',
      UserName: 'Mohamed',
      rating: 3,
      feedback: 'Great Experience',
    },
    {
      userAvatar: '/assets/avatar/tooth-extraction.png',
      UserName: 'Narnoura',
      rating: 4,
      feedback: 'Great Experience',
    },
    {
      userAvatar: '/assets/avatar/dentist.png',
      UserName: 'Mohamed',
      rating: 3,
      feedback: 'Great Experience',
    },
    {
      userAvatar: '/assets/avatar/tooth-extraction.png',
      UserName: 'Yaryoura',
      rating: 4,
      feedback: 'Great Experience',
    },
    {
      userAvatar: '/assets/avatar/tooth-extraction.png',
      UserName: 'Marioma',
      rating: 4,
      feedback: 'Great Experience',
    },
  ];
}
