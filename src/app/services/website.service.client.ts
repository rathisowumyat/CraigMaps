import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';

import {environment} from '../../environments/environment';

@Injectable()
export class WebsiteService {
  websites: any[] = [];

  constructor(private http: Http){}

  baseUrl = environment.baseUrl;

  findAllWebSites() {
    return this.websites;
  }

  updateWebsite(userId: String, newWebsite: any) {
    const url =  this.baseUrl + '/api/website/' + newWebsite._id;
    return this.http.put(url, newWebsite).map((response: Response) => {
      return response.json();
    });
  }

  findWebsiteById(userId: String, websiteId: String) {
    const url = this.baseUrl + '/api/website/' + websiteId;
    return this.http.get(url).map((response: Response) => {
      return response.json();
    });
  }

  deleteWebsite(userId: String,  websiteId: String){
    const url = this.baseUrl + '/api/website/' + websiteId;
    return this.http.delete(url).map((response: Response) => {
      return response.json();
    });
  }

  createWebsiteForUser(userId: String, website: any) {
    const url = this.baseUrl + '/api/user/' + userId + '/website';
    return this.http.post(url, website).map((response: Response) => {
      return response.json();
    });
  }


  findWebsiteForUser(userId: String) {
    const url =  this.baseUrl + '/api/user/' + userId + '/website';
    return this.http.get(url).map((response: Response) => {
      return response.json();
    });
  }
}
