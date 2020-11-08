import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ISeo } from '../models/seoModel';

@Injectable({ providedIn: 'root' })
export class SEOService {
  constructor(private titleService: Title, private metaTagService: Meta) {}

  setHeaderElements(seoObjects: ISeo): void {
    if (seoObjects.title) {
      const title = `${seoObjects.title}`;
      this.titleService.setTitle(title);
    }
    if (seoObjects.metaTags && seoObjects.metaTags.length > 0) {
      this.metaTagService.addTags(seoObjects.metaTags);
    }
  }
}
