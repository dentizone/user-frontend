import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Posts } from '../../../../core/models/posts';
import { ProfileService } from '../../service/profile.service';
@Component({
  selector: 'app-user-posts',
  imports: [CommonModule, RouterLink],
  templateUrl: './user-posts.component.html',
  styleUrl: './user-posts.component.css',
})
export class UserPostsComponent implements OnInit {
  Current: Posts[] = [];
  constructor(private profileService: ProfileService, private router: Router) {}
  ngOnInit(): void {
    this.profileService.getUserPosts().subscribe({
      next: (data) => {
        this.Current = data;
      },
      error: (err) => {
        this.Current = [];
        console.log(err);
      },
    });
  }

  trackById(index: number, item: Posts) {
    return item.id;
  }

  onEditPost(id: string) {
    this.router.navigate(['/edit-post', id]);
  }

  onAddNewPost() {
    this.router.navigate(['/add-new-post']);
  }
}
