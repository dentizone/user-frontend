import { Component } from '@angular/core';
import { AdsCardComponent } from './components/ads-card/ads-card.component';
import { FeedbackSectionComponent } from './components/feedback-section/feedback-section.component';
import { ServiceSectionComponent } from './components/services-section/service-section/service-section.component';
import { WelcomeCardComponent } from './components/welcome-card/welcome-card.component';

@Component({
  selector: 'app-home-container',
  imports: [
    WelcomeCardComponent,
    ServiceSectionComponent,
    AdsCardComponent,
    FeedbackSectionComponent,
  ],
  templateUrl: './home-container.component.html',
  styleUrl: './home-container.component.css',
})
export class HomeContainerComponent {}
