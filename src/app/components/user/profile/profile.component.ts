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
    this.username = this.user['username'];

    if(this.user['email'])
      this.email = this.user['email'];

    if(this.user['firstName'])
      this.firstname = this.user['firstName'];

    if(this.user['lastName'])
      this.lastname = this.user['lastName'];
  }

  updateUser(){
    this.user['username'] = this.username;
    this.user['email'] = this.email;
    this.user['firstName'] = this.firstname;
    this.user['lastName'] = this.lastname;
    this.user['_id'] = this.userId;
    this.userservice.updateUser(this.userId, this.user).subscribe((response)=>{
      // successfully updated
    });
  }

  logout() {
    this.userservice.logout()
      .subscribe(
        (data: any) => this.router.navigate(['/login'])
      );
  }

  // updateUser(username, email, firstname, lastname) {
	//  this.route.params.subscribe(params => {
	// this.userId = params['userId'];
	// const user1 = {'_id':this.userId,
	//  'username': username,
  //   'email': email,
  //  'firstName': firstname,
  //   'lastName': lastname
  // }
  //   return this.userservice.updateUser(user1).subscribe(
  //     (user) => {
  //       this.user = user;
  //     });
	//   });
  // }

  deleteUser() {
    this.route.params.subscribe(params => {
      this.userId = params['userId'];
      return this.userservice.deleteUser(this.userId).subscribe(
        (users) => {
        });
    });
  }

  // ngOnInit() {
  //   this.route.params.subscribe(params => {
  //     this.userId = params['userId'];
  //     this.userservice.findUserById(this.userId).subscribe(
  //       (user) => {
  //         this.user = user;
	// 	  this.username = user.username;
	// 	  this.email = user.email;
	// 	  this.firstname = user.firstName;
	// 	  this.lastname = user.lastName;
  //       });
  //   });
  // }
}
