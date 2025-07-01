import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { FooterComponent } from './shared/components/footer/footer.component';
import { NavBarComponent } from './shared/components/nav-bar/nav-bar.component';
import { ProfileContainerComponent } from "./features/Profile/components/profile-container/profile-container.component";
import { FavListComponent } from "./features/FavList/fav-list/fav-list.component";
import { ReviewComponent } from "./features/Review/review/review.component";
import { PostViewPageComponent } from "./features/PostView/post-view-page.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule, NavBarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'user-frontend';
  value1: number = 0;
}
