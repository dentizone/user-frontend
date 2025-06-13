import { ButtonModule } from 'primeng/button';
import { Component } from '@angular/core';
import { FooterComponent } from './shared/components/footer/footer.component';
import { ForgetPasswordComponent } from './features/Auth/forget-password/forget-password.component';
import { NavBarComponent } from './shared/components/nav-bar/nav-bar.component';
import { RouterOutlet } from '@angular/router';
import { ListingPageComponent } from "./features/ListingPage/listing-page/listing-page.component";
import { PostViewPageComponent } from "./features/PostView/post-view-page/post-view-page.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule, NavBarComponent, FooterComponent, ListingPageComponent, PostViewPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'user-frontend';
  value1: number = 0;
}
