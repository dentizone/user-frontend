import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

const DEFAULT_TITLE = 'Dentizone | Marketplace for Dentist Students in Egypt';
const DEFAULT_DESCRIPTION =
  'Dentizone is a marketplace for dentist students in Egypt to help them sell and find their dental items.';
const DEFAULT_KEYWORDS =
  'dentizone, dental marketplace, dentist students, Egypt, dental items, buy, sell';

@Injectable({ providedIn: 'root' })
export class SeoService {
  constructor(private meta: Meta, private title: Title) {}

  updateTitle(title: string = DEFAULT_TITLE) {
    this.title.setTitle(title);
  }

  updateDescription(desc: string = DEFAULT_DESCRIPTION) {
    this.meta.updateTag({ name: 'description', content: desc });
  }

  updateKeywords(keywords: string = DEFAULT_KEYWORDS) {
    this.meta.updateTag({ name: 'keywords', content: keywords });
  }

  setMetaTags({
    title,
    description,
    keywords,
  }: { title?: string; description?: string; keywords?: string } = {}) {
    this.updateTitle(title || DEFAULT_TITLE);
    this.updateDescription(description || DEFAULT_DESCRIPTION);
    this.updateKeywords(keywords || DEFAULT_KEYWORDS);
  }
}
