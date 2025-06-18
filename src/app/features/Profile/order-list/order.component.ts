import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-order',
  imports: [CommonModule, RouterModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
})
export class OrderComponent {
  orders = [
    {
      id: '12345',
      date: '2023-05-15',
      status: 'Shipped',
      total: 1177.17,
    },
    {
      id: '12346',
      date: '2023-05-10',
      status: 'Delivered',
      total: 299.99,
    },
    {
      id: '12347',
      date: '2023-04-28',
      status: 'Processing',
      total: 499.50,
    },
  ];

  constructor(private router: Router) {}

  goToOrder(id: string) {
    this.router.navigate(['/profile/orders', id]);
  }
}
