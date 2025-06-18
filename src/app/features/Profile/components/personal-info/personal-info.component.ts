import { Component } from '@angular/core';
import { UserPostsComponent } from "../user-posts/user-posts.component";

@Component({
  standalone:true,
  selector: 'app-personal-info',
  imports: [UserPostsComponent],
  templateUrl: './personal-info.component.html',
  styleUrl: './personal-info.component.css',
})
export class PersonalInfoComponent {
  userName = 'Nourhane';
  generatedName = 'User-1234';
  rating=4.3;
  userEmail = 'nourhane@gmail.com';
  verificationStatus = 'verified';
  academicYear = 'Year 5';
  userUniversity = 'Alexanria University';
  userPhoneNumber = '+201210082921';
  avatarSrc='/assets/avatar/tooth-extraction.png'
  userAddress = 'Smouha, Alexanria';

  userPosts = [
    {
      title: "MANI K FILES ( SIZE 6 )",
      description: "Lorem ipsum is placeholder text commonly used in the mockups.",
      price: "170",
      imagesrc: "/assets/items/image1.png",
      rating: "3.5"
    },
    {
      title: "Alphasil Rubber Base impression kit",
      description: "Lorem ipsum is placeholder text commonly used in the mockups.",
      price: "1700",
      imagesrc: "/assets/items/image2.png",
      rating: "3.5"
    },
    {
      title: "Calibra Veneer Esthetic Resin",
      description: "Lorem ipsum is placeholder text commonly used in the mockups.",
      price: "2650",
      imagesrc: "/assets/items/image3.png",
      rating: "3.5"
    },
    {
      title: "Ultradent PermaFlo-A1",
      description: "Lorem ipsum is placeholder text commonly used in the mockups.",
      price: "900",
      imagesrc: "/assets/items/image4.png",
      rating: "3.5"
    }
  ];
}
