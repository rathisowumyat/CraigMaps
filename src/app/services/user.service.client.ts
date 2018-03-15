import { User } from '../models/user.model.client';
import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class UserService {

  constructor(private http: Http) {}

  createUser(user){
    const url = 'http://localhost:3100/api/user/';
    return this.http.post(url, user)
      .map((response: Response) => {
      return response.json();
    });
  }

  findUserByCredentials(username, password) {
    return this.http.get('http://localhost:3100/api/user?username=' + username + '&password=' + password)
      .map((response: Response) => {
        return response.json();
      });
  }

  findUserById(userId) {
    return this.http.get('http://localhost:3100/api/user/' + userId)
      .map((response: Response) => {
        return response.json();
      });
  }

  updateUser(user) {
    const url =  'http://localhost:3100/api/user/' + user._id;
    return this.http.put(url, user)
      .map((response: Response) => {
      return response.json();
    });
  }

  deleteUser(userId) {
    const url =  'http://localhost:3100/api/user/' + userId;
    return this.http.delete(url)
      .map((response: Response) => {
      return response.json();
    });
  }
}
