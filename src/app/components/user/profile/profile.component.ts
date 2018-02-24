import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service.client';
import { User } from '../../../models/user.model.client';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userId: String;
  user: User;
  email: String;
  username: String;
  firstname: String;
  lastname: String;

  constructor(
    private userservice: UserService,
    private route: ActivatedRoute) { }

  createUser(user) {
    this.userservice.createUser(user);
  }

  updateUser(email, firstname, lastname) {
    const user = this.userservice.findUserById(this.userId);
    user.email = email;
    user.firstName = firstname;
    user.lastName = lastname;
    this.userservice.updateUser(this.userId, user);
    alert( 'User updated successfully');
  }

  deleteUser() {
    this.userservice.deleteUser(this.userId);
    alert( 'User deleted successfully. You may now close the app');
  }

  ngOnInit() {
    this.route.params.subscribe( params => {
      this.userId = params['userId'];
      this.user = this.userservice.findUserById(this.userId);
    });
  }
}
