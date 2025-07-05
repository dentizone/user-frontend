import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UserPostsComponent } from '../user-posts/user-posts.component';

@Component({
  standalone: true,
  selector: 'app-personal-info',
  imports: [CommonModule, UserPostsComponent],
  templateUrl: './personal-info.component.html',
  styleUrl: './personal-info.component.css',
})
export class PersonalInfoComponent {
  // Only user posts logic should remain here, if any
}
