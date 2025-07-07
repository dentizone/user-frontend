import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-about',
  standalone: true,
  templateUrl: './about.component.html',
  styleUrls: [],
})
export class AboutComponent implements OnInit {
  constructor(private seo: SeoService) {}
  ngOnInit() {
    this.seo.setMetaTags({
      title: 'About | Dentizone',
      description:
        'Learn more about Dentizone, the marketplace for dentist students in Egypt.',
      keywords: 'about, dentizone, dental marketplace, Egypt',
    });
  }
}
