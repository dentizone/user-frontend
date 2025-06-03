import { Component } from '@angular/core';
import { WelcomeCardComponent } from "../AdsCard/welcome-card/welcome-card.component";
import { ServiceSectionComponent } from "../ourServicesSection/service-section/service-section.component";
import { AdsCardComponent } from "../AdsCard/ads-card/ads-card.component";
import { FeedbackSectionComponent } from "../feedback-section/feedback-section.component";

@Component({
  selector: 'app-home-container',
  imports: [WelcomeCardComponent, ServiceSectionComponent, AdsCardComponent, FeedbackSectionComponent],
  templateUrl: './home-container.component.html',
  styleUrl: './home-container.component.css'
})
export class HomeContainerComponent {

}
