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

  updateUser(username, email, firstname, lastname) {
	 this.route.params.subscribe(params => {
	this.userId = params['userId'];
	const user1 = new User(this.userId,
	username,
    email,
    firstname,
    lastname);
    return this.userservice.updateUser(user1).subscribe(
      (user) => {
        this.user = user;
      });
	  });
  }

  deleteUser() {
    this.route.params.subscribe(params => {
      this.userId = params['userId'];
      return this.userservice.deleteUser(this.userId).subscribe(
        (users) => {
        });
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['userId'];
      this.userservice.findUserById(this.userId).subscribe(
        (user) => {
          this.user = user;
		  this.username = user.username;
		  this.email = user.email;
		  this.firstname = user.firstName;
		  this.lastname = user.lastName;
        });
    });
  }
}
