import { ButtonModule } from 'primeng/button';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './shared/components/nav-bar/nav-bar.component';
import { FooterComponent } from "./shared/components/footer/footer.component";
import { WelcomeCardComponent } from "./features/Home/AdsCard/welcome-card/welcome-card.component";
import { ServiceSectionComponent } from './features/Home/ourServicesSection/service-section/service-section.component';
import { AdsCardComponent } from "./features/Home/AdsCard/ads-card/ads-card.component";
import { FeedbackSectionComponent } from "./features/Home/feedback-section/feedback-section.component";
import { HomeContainerComponent } from "./features/Home/home-container/home-container.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule, NavBarComponent, FooterComponent, WelcomeCardComponent, ServiceSectionComponent, AdsCardComponent, FeedbackSectionComponent, HomeContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'user-frontend';
  value1: number = 0;
}
