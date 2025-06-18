import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-order-details',
  imports: [CommonModule, RouterModule],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css',
})
export class OrderDetailsComponent {
  orderItems = [
    {
      name: 'Sealer 3M',
      details: 'Used for 2 patients only',
      quantity: 1,
      price: 899.99,
      image: 'assets/items/image1.png',
    },
    {
      name: 'Endo Ruler',
      details: 'Metal autoclavable ruler',
      quantity: 1,
      price: 149.99,
      image: 'assets/items/image2.png',
    },
    {
      name: 'Bond',
      details: 'Expired for preclinical only',
      quantity: 1,
      price: 29.99,
      image: 'assets/items/image3.png',
    },
  ];
} 