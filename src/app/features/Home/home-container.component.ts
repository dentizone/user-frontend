import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../core/services/seo.service';
import { AdsCardComponent } from './components/ads-card/ads-card.component';
import { FeedbackSectionComponent } from './components/feedback-section/feedback-section.component';
import { ServiceSectionComponent } from './components/services-section/service-section/service-section.component';
import { WelcomeCardComponent } from './components/welcome-card/welcome-card.component';

@Component({
  selector: 'app-home-container',
  standalone: true,
  imports: [
    WelcomeCardComponent,
    ServiceSectionComponent,
    AdsCardComponent,
    FeedbackSectionComponent,
  ],
  templateUrl: './home-container.component.html',
  styleUrl: './home-container.component.css',
})
export class HomeContainerComponent implements OnInit {
  constructor(private seo: SeoService) {}

  ngOnInit() {
    this.seo.setMetaTags({
      title: 'Home | Dentizone',
      description:
        'Welcome to the home page of Dentizone. Discover products, services, and more.',
      keywords: 'home, dentizone, products, services',
    });
  }
}
