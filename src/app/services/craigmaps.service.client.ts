import {Injectable} from '@angular/core';
import {Http, RequestOptions, RequestOptionsArgs, Response} from '@angular/http';
import 'rxjs/Rx';
import {environment} from '../../environments/environment';
import {createClient} from '@google/maps';
import {DirectionsService} from '@google/maps';

@Injectable()
export class CraigmapsService {

  from: any;
  to: any;
  mode: any;
  options: RequestOptionsArgs;

  constructor(private http: Http){}
  baseUrl = environment.baseUrl;

  route(from, to, mode) {
    const body = {
      list: from,
      to: to,
      mode: mode
    };
    return this.http.post(this.baseUrl + '/api/craigmaps/routes',  body)
      .map((response: Response) => {
        return response.json();
      });
  }

  oneroute(from, to, mode) {
    const body = {
      list: from,
      to: to,
      mode: mode
    };
    return this.http.post(this.baseUrl + '/api/craigmaps/oneroute',  body)
      .map((response: Response) => {
        return response.json();
      });
  }

  rental(from, rent) {
    const body = {
      from: from,
      rent: rent
    };
    return this.http.post(this.baseUrl + '/api/craigmaps/rentals/' , body)
      .map((response: Response) => {
        return response.json();
      });
  }
}
