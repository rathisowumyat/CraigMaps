import { Page } from '../models/page.model.client';
import {Injectable} from '@angular/core';
import {PAGES} from './page.mock';


@Injectable()
export class PageService {

    pages: Page[] = PAGES;

  createPage(websiteId: String, page: Page) {
        this.pages.push(new Page(page._id, page.name, websiteId, page.description));
  }

  findPageByWebsiteId(websiteId: String) {
    const resultSet = [];
    for ( const i in this.pages) {
      if (this.pages[i].websiteId === websiteId) {
        resultSet.push(this.pages[i]);
      }
    }
    return resultSet;
  }

  findPageByWebsiteId2(websiteId: String) {
   return this.pages.filter(function (page) {
     return page.websiteId === websiteId;
   });
  }

  findPageById(pageId: String) {
    return this.pages.find(function (page) {
      return page._id === pageId;
    });
  }

  updatePage(pageId: String, page: Page) {
    for (const i in this.pages) {
      if (this.pages[i]._id === pageId) {
        this.pages[i].name = page.name;
        this.pages[i].description = page.description;
        return this.pages[i];
      }
    }
  }

  deletePage(pageId: String) {
    for (const i in this.pages) {
      if (this.pages[i]._id === pageId) {
        const j = +i;
        this.pages.splice(j, 1);
      }
    }
  }
}
