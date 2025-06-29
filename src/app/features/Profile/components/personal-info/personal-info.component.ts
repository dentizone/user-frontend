import { Component, OnInit } from '@angular/core';
import { UserPostsComponent } from "../user-posts/user-posts.component";
import { ProfileService } from '../../service/profile.service';

@Component({
  standalone:true,
  selector: 'app-personal-info',
  imports: [UserPostsComponent],
  templateUrl: './personal-info.component.html',
  styleUrl: './personal-info.component.css',
})
export class PersonalInfoComponent implements OnInit{

  constructor(private profileService:ProfileService){}
  user: any;
  ngOnInit(): void {
    this.profileService.getUserProfile().subscribe({
      next: data => {this.user = data;
        console.log(this.user);
          this.userName = this.user.fullName;
          this.generatedName = 'User-1234';
          this.userEmail = this.user.username;
          this.verificationStatus = this.user.kycStatus;
          this.academicYear = 'Year '+this.user.academicYear;
          this.userUniversity = this.user.unversityName;
          this.userPhoneNumber = '+201210082921';
          this.avatarSrc='/assets/avatar/tooth-extraction.png'
          this.userAddress = 'Smouha, Alexanria';
      },
      error: err => console.error('Failed to load profile', err)
    });
    
    

    
  }

  userName :string='';
  generatedName = 'User-1234';
  userEmail :string='';
  verificationStatus :string='';
  academicYear :string='';
  userUniversity :string='';
  userPhoneNumber = '+201210082921';
  avatarSrc='/assets/avatar/tooth-extraction.png'
  userAddress = 'Smouha, Alexanria';

  userPosts = [  ];
}
