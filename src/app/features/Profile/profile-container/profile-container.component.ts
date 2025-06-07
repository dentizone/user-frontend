import { Component } from '@angular/core';
import { PersonalInfoComponent } from "../components/personal-info/personal-info.component";
import { UserPostsComponent } from "../components/user-posts/user-posts.component";

@Component({
  standalone:true,
  selector: 'app-profile-container',
  imports: [PersonalInfoComponent, UserPostsComponent],
  templateUrl: './profile-container.component.html',
  styleUrl: './profile-container.component.css'
})
export class ProfileContainerComponent {

}
