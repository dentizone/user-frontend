import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PersonalInfoComponent } from "../personal-info/personal-info.component";
import { UserPostsComponent } from "../user-posts/user-posts.component";
import { OrderComponent } from "../../order-list/order.component";

@Component({
  standalone:true,
  selector: 'app-profile-container',
  imports: [CommonModule, RouterModule, UserPostsComponent, OrderComponent, PersonalInfoComponent],
  templateUrl: './profile-container.component.html',
  styleUrl: './profile-container.component.css'
})
export class ProfileContainerComponent {
  selectedView: string = 'personal-info';

  setView(view: string) {
    this.selectedView = view;
  }
}
