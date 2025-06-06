import { ButtonModule } from 'primeng/button';
import { Component } from '@angular/core';
import { FooterComponent } from './shared/components/footer/footer.component';
import { NavBarComponent } from './shared/components/nav-bar/nav-bar.component';
import { RouterOutlet } from '@angular/router';
import { ProfileContainerComponent } from "./features/Profile/profile-container/profile-container.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule, NavBarComponent, FooterComponent, ProfileContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'user-frontend';
  value1: number = 0;
}
