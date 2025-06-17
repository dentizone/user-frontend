import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PaginatorModule } from 'primeng/paginator';
import { Posts } from '../../../core/models/posts';



@Component({
  selector: 'app-listing-page',
  imports: [PaginatorModule,CommonModule],
  templateUrl: './listing-page.component.html',
  styleUrl: './listing-page.component.css'
})
export class ListingPageComponent {
  clinicalproduct:Posts[]=[
    {id: "1",
      title:"MANI K FILES ( SIZE 6 )",
      description:"Lorem ipsum is placeholder text commonly used in the mockups.",
      price:"170",
      imagesrc:"/assets/items/image1.png",
      rating:"3.5"
    },{id: "2",
      title:"Alphasil Rubber Base impression kit",
      description:"Lorem ipsum is placeholder text commonly used in the mockups.",
      price:"1700",
      imagesrc:"/assets/items/image2.png",
      rating:"3.5"
    },
    {id: "3",
      title:"Calibra Veneer Esthetic Resin",
      description:"Lorem ipsum is placeholder text commonly used in the mockups.",
      price:"2650",
      imagesrc:"/assets/items/image3.png",
      rating:"3.5"
    },
    {id: "4",
      title:"Ultradent PermaFlo-A1",
      description:"Lorem ipsum is placeholder text commonly used in the mockups.",
      price:"900",
      imagesrc:"/assets/items/image4.png",
      rating:"3.5"
    }
  ]
 currentPage = 1;
  totalPages = 5;
  pages: number[] = [];

  constructor() {
    this.updatePages();
  }

  updatePages() {
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }

}
