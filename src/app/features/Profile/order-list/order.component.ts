import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { OrderServiceService } from '../OrderService/order-service.service';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';

@Component({
  standalone: true,
  selector: 'app-order',
  imports: [CommonModule, RouterModule, LoaderComponent],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
})
export class OrderComponent implements OnInit {
  isLoading = true;

  ngOnInit(): void {
    this.isLoading = true;
    this.myOrder.GetAllOrders().subscribe({
      next: (Data) => {
        this.orders = Data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  orders: any = [{}];

  constructor(
    private readonly router: Router,
    private readonly myOrder: OrderServiceService
  ) {}

  goToOrder(id: string) {
    this.router.navigate(['/profile/orders', id]);
  }
}
