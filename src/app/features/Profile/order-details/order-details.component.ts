import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import html2canvas from 'html2canvas-pro';
import { jsPDF } from 'jspdf';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';
import { ListingService } from '../../ListingPage/listingService/listing.service';
import { OrderServiceService } from '../OrderService/order-service.service';

@Component({
  standalone: true,
  selector: 'app-order-details',
  imports: [CommonModule, RouterModule, LoaderComponent],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css',
})
export class OrderDetailsComponent implements OnInit {
  isLoading = true;
  createdAt!: any;
  ngOnInit(): void {
    const orderID = this.route.snapshot.paramMap.get('id')!;
    this.service.GetOrderDetails(orderID).subscribe({
      next: (Data) => {
        this.orderDetails = Data;
        this.orderItems = this.orderDetails.orderItems;
        this.statusTimeline = this.orderDetails.statusTimeline ?? [];

        this.createdAt = new Date(
          this.orderDetails.createdAt
        ).toLocaleDateString('en-GB', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        });

        this.orderItems.forEach((item: any, index: any) => {
          this.postService.getPostById(item.postId).subscribe((postData) => {
            this.orderItems[index].image = postData.assets[0].url;
            this.orderItems[index].postTitle = postData.title;
            this.orderItems[index].details = postData.description;
          });
        });
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }
  constructor(
    private readonly service: OrderServiceService,
    private readonly route: ActivatedRoute,
    private readonly postService: ListingService
  ) {}
  orderDetails: any = {};
  orderItems: any = [];
  statusTimeline: any[] = [];

  getStatusTimestamp(statusKey: string): string | null {
    const found = this.statusTimeline.find((s: any) => s.status === statusKey);
    return found
      ? new Date(found.timestamp).toLocaleDateString('en-GB', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })
      : null;
  }

  getCurrentStatusIndex(): number {
    // The last index in the timeline is the current status
    return this.statusTimeline.length - 1;
  }

  generatePDF() {
    const data = document.getElementById('order-details-content');
    if (!data) return;
    html2canvas(data).then((canvas) => {
      const imgWidth = 208;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('order-receipt.pdf');
    });
  }
}
