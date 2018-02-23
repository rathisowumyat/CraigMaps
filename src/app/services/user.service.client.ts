import { User } from '../models/user.model.client';
import {Injectable} from '@angular/core';
import {USERS} from './user.mock';

@Injectable()
export class UserService {
  users: User[] = USERS ;

    createUser(user: User) {
      this.users.push(new User(user._id, user.username, user.password, user.firstName, user.lastName));
    }

    findUserById(userId: String) {
      return this.users.find(function(user) {
        return user._id === userId;
      });
    }

    findUserByUsername(username: String) {
      return this.users.find(function(user) {
        return user.username === username;
      });
    }


    findUserByCredential(username: String, password: String) {
      return this.users.find( function (user) {
        // alert(user.username + '' + user._id);
         return user.username === username && user.password === password;
      });
    }

  updateUser(userId: String, user: User) {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i]._id === userId) {
        this.users[i].firstName = user.firstName;
        this.users[i].lastName = user.lastName;
        this.users[i].email = user.email;
        return this.users[i];
      }
    }
  }

  deleteUser(userId: String) {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i]._id === userId) {
        this.users.splice(i, 1);
        i = this.users.length;
      }
    }
  }

}
