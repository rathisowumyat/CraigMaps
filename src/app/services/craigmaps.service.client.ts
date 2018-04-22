import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';
import {environment} from '../../environments/environment';
// import 'googlemaps'
// import DirectionsService = google.maps.DirectionsService;
import {createClient} from '@google/maps';
import {DirectionsService} from '@google/maps';

@Injectable()
export class CraigmapsService {

  from: any;
  to: any;
  mode: any;

  constructor(private http: Http){}
  baseUrl = environment.baseUrl;

  search(from, to) {
    console.log(from + to);

    return this.http.get(this.baseUrl + '/api/craigmaps/' + from + '/' + to)
      .map((response: Response) => {
        return response.json();
      });
  }

  rental(from) {
    console.log(from);

    return this.http.get(this.baseUrl + '/api/craigmaps/' + from)
      .map((response: Response) => {
        return response.json();
      });
  }

  search1(from, to) {

    var googleMapsClient = createClient({
      key: 'AIzaSyCh83vE6TuJUB6BZswszWjLNwu5LsH-Z3w'
    });

    this.from = from;
    this.to = to;
    this.mode = 'walking';

    var request = {
      origin: this.from,
      destination: this.to,
      mode: this.mode
    };

    // return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address='
    //  + from  + '&key=AIzaSyCh83vE6TuJUB6BZswszWjLNwu5LsH-Z3w')
    //   .map((response: Response) => {
    //     return response;
    //   });

    return this.http.get(this.baseUrl + '/api/craigmaps/' + from + '/' + to)
      .map(
        (res: Response) => {
          console.log(res);
          // const data = res.json();
          // return data;
          return res;
        }
      );

    // return this.http.get('https://maps.googleapis.com/maps/api/directions/json?origin='
    //  + from +'&destination=' + to + '&mode=' + this.mode + '&key=AIzaSyCh83vE6TuJUB6BZswszWjLNwu5LsH-Z3w')
    //   .map((response: Response) => {
    //     return response;
    //   });


  }
}
