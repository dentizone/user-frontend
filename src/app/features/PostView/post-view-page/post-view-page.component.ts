import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-post-view-page',
  imports: [CommonModule],
  templateUrl: './post-view-page.component.html',
  styleUrl: './post-view-page.component.css'
})
export class PostViewPageComponent {
  images: string[] = [
    '/assets/items/image1.png',
    '/assets/items/image2.png',
    '/assets/items/image3.png',
    '/assets/items/image4.png'
  ];

  mainImage: string = this.images[0];

  questions = [
    {
      username: 'User-2314',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
      time: '2 Hrs ago',
    },
    {
      username: 'User-3416',
      text: 'Reply Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
      time: '4 Hrs ago',
    },
    {
      username: 'User-3416',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
      time: '4 Hrs ago',
    },
  ];

}
