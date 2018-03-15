import {Injectable} from '@angular/core';
import {Website} from '../models/website.model.client';
import {WEBSITES} from './website.mock';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';

import {environment} from '../../environments/environment';
import {Page} from '../models/page.model.client';
import {PAGES} from './page.mock';

@Injectable()
export class PageService {
  pages: Page[] = [];

  constructor(private http: Http){}

  baseUrl = environment.baseUrl;

  findAllPages() {
    return this.pages;
  }

  updatePage(pageId: String, newWebsite: Page) {
    const url = 'http://localhost:3100/api/page/' + newWebsite._id;
    return this.http.put(url, newWebsite).map((response: Response) => {
      return response.json();
    });
  }

  findPageById(websiteId: String, pageId: String) {
    const url = 'http://localhost:3100/api/page/' + pageId;
    return this.http.get(url).map((response: Response) => {
      return response.json();
    });
  }

  deletePage(websiteId: String,  pageId: String) {
    const url = 'http://localhost:3100/api/page/' + pageId;
    return this.http.delete(url).map((response: Response) => {
      return response.json();
    });
  }

  createPage(websiteId: String, page: Page) {
    const url = 'http://localhost:3100/api/website/' + websiteId + '/page';
    return this.http.post(url, page).map((response: Response) => {
      return response.json();
    });
  }


  findPageForWebsite(websiteId: String) {
    const url = 'http://localhost:3100/api/website/' + websiteId + '/page';
    return this.http.get(url).map((response: Response) => {
      return response.json();
    });
  }
}
