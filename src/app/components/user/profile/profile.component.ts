import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { UserService } from '../../../services/user.service.client';
import {SharedService} from '../../../services/shared.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userId: string;
  user: any;
  email: string;
  username: string;
  firstname: string;
  lastname: string;

  constructor(
    private userservice: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private sharedService: SharedService) { }

  ngOnInit() {
    this.user = this.sharedService.user;
    this.userId = this.user['_id'];
    this.userservice.findUserById(this.userId).subscribe(
          (user) => {
            this.user = user;
    	  this.username = user.username;
    	  this.email = user.email;
    	  this.firstname = user.firstName;
    	  this.lastname = user.lastName;
          });
  }

  logout() {
    this.userservice.logout()
      .subscribe(
        (data: any) => this.router.navigate(['/login'])
      );
  }

  updateUser(username, email, firstname, lastname) {
	const user1 = {'_id':this.userId,
	 'username': username,
    'email': email,
   'firstName': firstname,
    'lastName': lastname
    }
    this.userservice.updateUser(user1).subscribe(
      (user) => {
        this.user = user;
      });
  }

  deleteUser() {
    this.route.params.subscribe(params => {
      return this.userservice.deleteUser(this.userId).subscribe(
        (users) => {
        });
    });
  }
}
