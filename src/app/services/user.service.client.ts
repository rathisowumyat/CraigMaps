import { Injectable } from '@angular/core';
import {Http, Response, RequestOptions, URLSearchParams} from '@angular/http';
import 'rxjs/Rx';
import {environment} from "../../environments/environment";
import {SharedService} from "./shared.service";
import {Router} from '@angular/router';

@Injectable()
export class UserService{

  baseURL = environment.baseUrl;

  constructor(private http: Http,
              private sharedService: SharedService,
              private router: Router ){  }

  login(username: string, password: string) {
    let requestOptions = new RequestOptions();
    requestOptions.withCredentials = true;

    const body = {
      username : username,
      password : password
    };

    return this.http.post(this.baseURL + '/api/login', body, requestOptions)
      .map(
        (res: Response) => {
          const data = res.json();
          return data;
        }
      );
  }

  logout() {
    let requestOptions = new RequestOptions();
    requestOptions.withCredentials = true;
    return this.http.post(this.baseURL + '/api/logout', '', requestOptions)
      .map(
        (res: Response) => {
          const data = res;
        }
      );
  }

  register(username: string, password: string) {
    let requestOptions = new RequestOptions();
    requestOptions.withCredentials = true;
    const user = {
      'username': username,
      'password': password,
      'firstName': username,
      'lastName': username,
      'email': 't@gmail.com',
      'phone': ''
    };

    return this.http.post(this.baseURL + '/api/register', user, requestOptions)
      .map(
        (res: Response) => {
          const data = res.json();
          return data;
        }
      );
  }

  loggedIn() {
    let requestOptions = new RequestOptions();
    requestOptions.withCredentials = true;
    return this.http.get(this.baseURL + '/api/loggedin', requestOptions)
      .map(
        (res: Response) => {
          const user = res.json();
          if (user !== 0) {
            this.sharedService.user = user; // setting user so as to share with all components
            return true;
          } else {
            this.router.navigate(['/login']);
            return false;
          }
        }
      );
  }

  createUser(user : any){
    return this.http.post(this.baseURL + '/api/profile', user)
      .map((response: Response) => {
      return response.json();
    });
  }

  findUserById(userId : string){
    return this.http.get(this.baseURL + '/api/profile/' + userId)
      .map((response: Response) => {
      return response.json();
    });
  }

  findUserByUsername(username : string){
    let requestOptions = new RequestOptions();
    let params = new URLSearchParams();
    params.set("username", username);
    requestOptions.params = params;
    return this.http.get(this.baseURL + '/api/profile',requestOptions)
      .map((response: Response) => {
      return response.json();
    });
  }

  findUserByCredentials(username : string, password : string){
    let requestOptions = new RequestOptions();
    let params = new URLSearchParams();
    params.set("username", username);
    params.set("password", password);
    requestOptions.params = params;
    requestOptions.withCredentials = true;
    return this.http.get(this.baseURL + '/api/profile',requestOptions)
      .map((response: Response) => {
      return response.json();
    });
  }

  updateUser(userId : string, user : any){
    return this.http.put(this.baseURL + '/api/profile/' + userId, user)
      .map((response: Response) => {
      return response.json();
    });
  }

  deleteUser(userId : string){
    return this.http.delete(this.baseURL+ '/api/profile/' + userId)
      .map((response: Response) => {
      return response.json();
    });
  }
}
