import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Posts } from '../../../../core/models/posts';

@Component({
  selector: 'app-user-posts',
  imports: [CommonModule,FormsModule],
  templateUrl: './user-posts.component.html',
  styleUrl: './user-posts.component.css'
})
export class UserPostsComponent {
  currentTab=0;
  selectedTab='0'
  ActivePosts:Posts[]=[
    {title:"MANI K FILES ( SIZE 6 )",
      id:'',
      description:"Lorem ipsum is placeholder text commonly used in the mockups.",
      price:"170",
      imagesrc:"/assets/items/image1.png",
      rating:"3.5"
    },{title:"Alphasil Rubber Base impression kit",
      id:'',
      description:"Lorem ipsum is placeholder text commonly used in the mockups.",
      price:"1700",
      imagesrc:"/assets/items/image2.png",
      rating:"3.5"
    },
    {title:"Calibra Veneer Esthetic Resin",
      id:'',
      description:"Lorem ipsum is placeholder text commonly used in the mockups.",
      price:"2650",
      imagesrc:"/assets/items/image3.png",
      rating:"3.5"
    },
    {title:"Ultradent PermaFlo-A1",
      id:'',
      description:"Lorem ipsum is placeholder text commonly used in the mockups.",
      price:"900",
      imagesrc:"/assets/items/image4.png",
      rating:"3.5"
    }
  ]
  Current:Posts[]=this.ActivePosts
  PendingPosts:Posts[]=[
    {title:"Calibra Veneer Esthetic Resin",
      id:'',
      description:"Lorem ipsum is placeholder text commonly used in the mockups.",
      price:"2650",
      imagesrc:"/assets/items/image3.png",
      rating:"3.5"
    },
    {title:"Ultradent PermaFlo-A1",
      id:'',
      description:"Lorem ipsum is placeholder text commonly used in the mockups.",
      price:"900",
      imagesrc:"/assets/items/image4.png",
      rating:"3.5"
    },{title:"MANI K FILES ( SIZE 6 )",
      id:'',
      description:"Lorem ipsum is placeholder text commonly used in the mockups.",
      price:"170",
      imagesrc:"/assets/items/image1.png",
      rating:"3.5"
    },{title:"Alphasil Rubber Base impression kit",
      id:'',
      description:"Lorem ipsum is placeholder text commonly used in the mockups.",
      price:"1700",
      imagesrc:"/assets/items/image2.png",
      rating:"3.5"
    }
  ]
  UnactivePosts:Posts[]=[
    {title:"Ultradent PermaFlo-A1",
      id:'',
      description:"Lorem ipsum is placeholder text commonly used in the mockups.",
      price:"900",
      imagesrc:"/assets/items/image4.png",
      rating:"3.5"
    },{title:"MANI K FILES ( SIZE 6 )",
      id:'',
      description:"Lorem ipsum is placeholder text commonly used in the mockups.",
      price:"170",
      imagesrc:"/assets/items/image1.png",
      rating:"3.5"
    },{title:"Alphasil Rubber Base impression kit",
      id:'',
      description:"Lorem ipsum is placeholder text commonly used in the mockups.",
      price:"1700",
      imagesrc:"/assets/items/image2.png",
      rating:"3.5"
    }
  ]
  changeCurent(input:any){
    console.log(input)
    switch(+input){
      case 1: this.Current=this.ActivePosts;this.currentTab=0;
      break;
      case 2:this.Current=this.PendingPosts;this.currentTab=1;
      break;
      case 3:this.Current=this.UnactivePosts;this.currentTab=2;
      break;
    }
  }
}
