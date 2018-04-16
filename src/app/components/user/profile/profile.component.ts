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

  userId: string = "";
  user = {};
  username: string = "";
  email: string = "";
  firstname: string = "";
  lastname: string = "";

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
    this.user['username'] = username;
    this.user['email'] = email;
    this.user['firstName'] = firstname;
    this.user['lastName'] = lastname;
    this.userservice.updateUser(this.userId, this.user)
      .subscribe(
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
