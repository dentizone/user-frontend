import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Posts } from '../../../../core/models/posts';
import { ReviewCardsComponent } from "../review-cards/review-cards.component";
import { ProfileService } from '../../service/profile.service';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-user-posts',
  imports: [CommonModule, FormsModule, ReviewCardsComponent,RouterLink],
  templateUrl: './user-posts.component.html',
  styleUrl: './user-posts.component.css'
})
export class UserPostsComponent implements OnInit{

  constructor(private profileService:ProfileService){}
  ngOnInit(): void {
    this.profileService.getUserPosts().subscribe({
      next:data=>{
        this.Current=data;
      },
      error:err=>{
        this.Current=[];
        console.log(err)}
    })
  }
  currentTab=0;
  selectedTab='0'
  reviews=[{
    username:'User-1234',
    avatarSrc:'/assets/avatar/tooth-extraction.png',
    rate:3.5,
    purchasedItemTitle:'File size 6',
    comment:'Great seller'
  },{
    username:'User-Abc2',
    avatarSrc:'/assets/avatar/dentist.png',
    rate:5,
    purchasedItemTitle:'File size 6',
    comment:''
  },{
    username:'User-12uy',
    avatarSrc:'/assets/avatar/tooth-extraction.png',
    rate:4.5,
    purchasedItemTitle:'Ultradent PermaFlo-A1',
    comment:'Great product'
  },{
    username:'User-14iu',
    avatarSrc:'/assets/avatar/tooth-extraction.png',
    rate:5,
    purchasedItemTitle:'Orthodontics Textbook',
    comment:'The textbook had few more highlights than i expected'
  },{
    username:'User-1525',
    avatarSrc:'/assets/avatar/dentist.png',
    rate:3,
    purchasedItemTitle:'File size 6',
    comment:''
  }]
  ActivePosts:Posts[]=[
    {title:"MANI K FILES ( SIZE 6 )",
      id:'',
      description:"Lorem ipsum is placeholder text commonly used in the mockups.",
      price:"170",
      assets:[{id:'',url:'/assets/items/image1.png'}],
      rating:"3.5"
    },{title:"Alphasil Rubber Base impression kit",
      id:'',
      description:"Lorem ipsum is placeholder text commonly used in the mockups.",
      price:"1700",
      assets:[{id:'',url:'/assets/items/image2.png'}],
      rating:"3.5"
    },
    {title:"Calibra Veneer Esthetic Resin",
      id:'',
      description:"Lorem ipsum is placeholder text commonly used in the mockups.",
      price:"2650",
      assets:[{id:'',url:'/assets/items/image3.png'}],
      rating:"3.5"
    },
    {title:"Ultradent PermaFlo-A1",
      id:'',
      description:"Lorem ipsum is placeholder text commonly used in the mockups.",
      price:"900",
      assets:[{id:'',url:'/assets/items/image4.png'}],
      rating:"3.5"
    }
  ]
  Current:Posts[]=this.ActivePosts
  PendingPosts:Posts[]=[
    {title:"Calibra Veneer Esthetic Resin",
      id:'',
      description:"Lorem ipsum is placeholder text commonly used in the mockups.",
      price:"2650",
      assets:[{id:'',url:'/assets/items/image3.png'}],
      rating:"3.5"
    },
    {title:"Ultradent PermaFlo-A1",
      id:'',
      description:"Lorem ipsum is placeholder text commonly used in the mockups.",
      price:"900",
      assets:[{id:'',url:'/assets/items/image4.png'}],
      rating:"3.5"
    },{title:"MANI K FILES ( SIZE 6 )",
      id:'',
      description:"Lorem ipsum is placeholder text commonly used in the mockups.",
      price:"170",
      assets:[{id:'',url:'/assets/items/image1.png'}],
      rating:"3.5"
    },{title:"Alphasil Rubber Base impression kit",
      id:'',
      description:"Lorem ipsum is placeholder text commonly used in the mockups.",
      price:"1700",
      assets:[{id:'',url:'/assets/items/image2.png'}],
      rating:"3.5"
    }
  ]
  UnactivePosts:Posts[]=[
    {title:"Ultradent PermaFlo-A1",
      id:'',
      description:"Lorem ipsum is placeholder text commonly used in the mockups.",
      price:"900",
      assets:[{id:'',url:'/assets/items/image2.png'}],
      rating:"3.5"
    },{title:"MANI K FILES ( SIZE 6 )",
      id:'',
      description:"Lorem ipsum is placeholder text commonly used in the mockups.",
      price:"170",
      assets:[{id:'',url:'/assets/items/image2.png'}],
      rating:"3.5"
    },{title:"Alphasil Rubber Base impression kit",
      id:'',
      description:"Lorem ipsum is placeholder text commonly used in the mockups.",
      price:"1700",
      assets:[{id:'',url:'/assets/items/image2.png'}],
      rating:"3.5"
    }
  ]
  changeCurent(input:any){
    
    switch(+input){
      case 0: this.Current=this.ActivePosts;this.currentTab=0;
      break;
      case 1:this.Current=this.PendingPosts;this.currentTab=1;
      break;
    }
  }
}
