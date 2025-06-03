import { ButtonModule } from 'primeng/button';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
<<<<<<< Updated upstream

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule],
=======
import { NavBarComponent } from './shared/components/nav-bar/nav-bar.component';
import { FooterComponent } from "./shared/components/footer/footer.component";
import { RegisterComponent } from "./features/Auth/Register/Component/register/register.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule, NavBarComponent, FooterComponent, RegisterComponent],
>>>>>>> Stashed changes
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'user-frontend';
  value1: number = 0;
}
