import { ButtonModule } from 'primeng/button';
import { Component } from '@angular/core';
import { RegisterComponent } from "./features/Auth/Register/Component/register/register.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule, RegisterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'user-frontend';
  value1: number = 0;
}
