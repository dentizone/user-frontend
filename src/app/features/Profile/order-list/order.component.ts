import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { OrderServiceService } from '../OrderService/order-service.service';


@Component({
  standalone: true,
  selector: 'app-order',
  imports: [CommonModule, RouterModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
})
export class OrderComponent implements OnInit {
   OrderStatues=[
     'Pending',
     'Arrived' ,
     'Cancelled' ]

 
  ngOnInit(): void {
    this.myOrder.GetAllOrders().subscribe({
      next: (Data)=> {this.orders=Data, 
        console.log(Data)
        
      }
    })
  }
  // formateDate(createdDate:Date):string{
  //   return createdDate.toLocaleDateString('en-GB', {
  //         year: 'numeric',
  //         month: 'long',
  //         day: 'numeric',
  //         hour: '2-digit',
  //         minute: '2-digit'
  //       });
  // }
  orders:any = [{}];

  constructor(private router: Router, private myOrder: OrderServiceService) {}

  goToOrder(id: string) {
    this.router.navigate(['/profile/orders', id]);
  }
}
