import { ButtonModule } from 'primeng/button';
import { Component } from '@angular/core';
import { FooterComponent } from './shared/components/footer/footer.component';
import { NavBarComponent } from './shared/components/nav-bar/nav-bar.component';
import { RouterOutlet } from '@angular/router';
import { AddNewPostComponent } from "./features/Add_Post/add-new-post/add-new-post.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule, NavBarComponent, FooterComponent, AddNewPostComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'user-frontend';
  value1: number = 0;
}
