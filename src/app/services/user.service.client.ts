import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';
import {environment} from '../../environments/environment';

@Injectable()
export class UserService {

  constructor(private http: Http) {}
  baseUrl = environment.baseUrl;

  createUser(user){
    const url = this.baseUrl + '/api/user/';
    return this.http.post(url, user)
      .map((response: Response) => {
      return response.json();
    });
  }

  findUserByCredentials(username, password) {
    return this.http.get(this.baseUrl + '/api/user?username=' + username + '&password=' + password)
      .map((response: Response) => {
        return response.json();
      });
  }

  findUserById(userId) {
    return this.http.get(this.baseUrl + '/api/user/' + userId)
      .map((response: Response) => {
        return response.json();
      });
  }

  updateUser(user) {
    const url =  this.baseUrl + '/api/user/' + user._id;
    return this.http.put(url, user)
      .map((response: Response) => {
      return response.json();
    });
  }

  deleteUser(userId) {
    const url =  this.baseUrl + '/api/user/' + userId;
    return this.http.delete(url)
      .map((response: Response) => {
      return response.json();
    });
  }
}
