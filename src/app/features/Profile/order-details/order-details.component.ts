import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { OrderServiceService } from '../OrderService/order-service.service';
import { Route } from '@angular/router';
import { ListingService } from '../../ListingPage/listingService/listing.service';

@Component({
  standalone: true,
  selector: 'app-order-details',
  imports: [CommonModule, RouterModule],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css',
})

export class OrderDetailsComponent implements OnInit {
  createdAt!:any;
  ngOnInit(): void {
    const orderID= this.route.snapshot.paramMap.get('id')!;
    this.service.GetOrderDetails(orderID).subscribe({
      next:(Data)=> {this.orderDetails= Data
        this.orderItems=this.orderDetails.orderItems

        this.createdAt=new Date(this.orderDetails.createdAt).toLocaleDateString('en-GB', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });

        this.orderItems.forEach((item:any, index:any) => {
          this.postService.getPostById(item.postId).subscribe((postData) => {
            this.orderItems[index].image = postData.assets[0].url;
            this.orderItems[index].postTitle = postData.title;
            this.orderItems[index].details = postData.description;
          });
        });
      console.log(Data)}
    })
  }
  constructor(private service: OrderServiceService, private route:ActivatedRoute, private postService:ListingService){
    

  }
  orderDetails:any={}
  orderItems:any = [

  ];
} 