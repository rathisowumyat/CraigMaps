import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';

import {environment} from '../../environments/environment';
@Injectable()
export class PageService {
  pages: any[] = [];

  constructor(private http: Http){}

  baseUrl = environment.baseUrl;

  findAllPages() {
    return this.pages;
  }

  updatePage(pageId: String, newWebsite: any) {
    const url = this.baseUrl + '/api/page/' + newWebsite._id;
    return this.http.put(url, newWebsite).map((response: Response) => {
      return response.json();
    });
  }

  findPageById(websiteId: String, pageId: String) {
    const url = this.baseUrl + '/api/page/' + pageId;
    return this.http.get(url).map((response: Response) => {
      return response.json();
    });
  }

  deletePage(websiteId: String,  pageId: String) {
    const url = this.baseUrl + '/api/page/' + pageId;
    return this.http.delete(url).map((response: Response) => {
      return response.json();
    });
  }

  createPage(websiteId: String, page: any) {
    const url = this.baseUrl + '/api/website/' + websiteId + '/page';
    return this.http.post(url, page).map((response: Response) => {
      return response.json();
    });
  }


  findPageForWebsite(websiteId: String) {
    const url = this.baseUrl + '/api/website/' + websiteId + '/page';
    return this.http.get(url).map((response: Response) => {
      return response.json();
    });
  }
}
