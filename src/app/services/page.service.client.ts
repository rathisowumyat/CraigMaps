import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';

import {environment} from '../../environments/environment';
@Injectable()
export class PageService {
  pages: any[] = [];
  baseUrl = environment.baseUrl;

  constructor(private http: Http){}

  findAllPages() {
    return this.pages;
  }

  updatePage(pageId: string, newWebsite: any) {
    const url = this.baseUrl + '/api/page/' + newWebsite._id;
    return this.http.put(url, newWebsite).map((response: Response) => {
      return response.json();
    });
  }

  findPageById(websiteId: string, pageId: string) {
    const url = this.baseUrl + '/api/page/' + pageId;
    return this.http.get(url).map((response: Response) => {
      return response.json();
    });
  }

  deletePage(websiteId: string,  pageId: string) {
    const url = this.baseUrl + '/api/page/' + pageId;
    return this.http.delete(url).map((response: Response) => {
      return response.json();
    });
  }

  createPage(websiteId: string, page: any) {
    const url = this.baseUrl + '/api/website/' + websiteId + '/page';
    return this.http.post(url, page).map((response: Response) => {
      return response.json();
    });
  }


  findPageForWebsite(websiteId: string) {
    const url = this.baseUrl + '/api/website/' + websiteId + '/page';
    return this.http.get(url).map((response: Response) => {
      return response.json();
    });
  }
}
