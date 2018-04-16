import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';

import {environment} from '../../environments/environment';

@Injectable()
export class WebsiteService {
  websites: any[] = [];
  baseUrl = environment.baseUrl;

  constructor(private http: Http){}

  findAllWebSites() {
    return this.websites;
  }

  updateWebsite(userId: string, newWebsite: any) {
    const url =  this.baseUrl + '/api/website/' + newWebsite._id;
    return this.http.put(url, newWebsite).map((response: Response) => {
      return response.json();
    });
  }

  findWebsiteById(userId: string, websiteId: string) {
    const url = this.baseUrl + '/api/website/' + websiteId;
    return this.http.get(url).map((response: Response) => {
      return response.json();
    });
  }

  deleteWebsite(userId: string,  websiteId: string){
    const url = this.baseUrl + '/api/website/' + websiteId;
    return this.http.delete(url).map((response: Response) => {
      return response.json();
    });
  }

  createWebsiteForUser(userId: string, website: any) {
    const url = this.baseUrl + '/api/profile/' + userId + '/website';
    return this.http.post(url, website).map((response: Response) => {
      return response.json();
    });
  }


  findWebsiteForUser(userId: string) {
    const url =  this.baseUrl + '/api/profile/' + userId + '/website';
    return this.http.get(url).map((response: Response) => {
      return response.json();
    });
  }
}
