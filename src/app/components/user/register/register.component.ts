import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {UserService} from '../../../services/user.service.client';
import {SharedService} from "../../../services/shared.service";

import {NgForm} from '@angular/forms';
import {RequestOptions} from '@angular/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  username: String;
  password: String;
  same: String;
  user: any;
  userId: String;
  firstname: String;
  lastname: String;
  errorFlag: boolean = false;
  errorMsg: string = "";
  @ViewChild('f') registerForm: NgForm;
  options = new RequestOptions();

  constructor(private userservice: UserService,
              private router: ActivatedRoute,
			        private route: Router,
              private sharedService: SharedService) { }

  createUser(username, password, same) {
    if ((!username) || (!password)) {
      alert ('Please give username and password');
      return;
    }
  if ( password === same ) {
      const tempid = (Math.floor(Math.random() * 10))+"";
      this.userId = tempid.toString();
      const user1 = {
        'username': username,
        'password': password,
        'firstName': username,
        'lastName': username,
        'email': 't@gmail.com',
        'phone': ''
      }
	  this.username = username;
	  this.password = password;
	  this.firstname = username;
	  this.lastname = username;
      this.router.params.subscribe(params => {
      return this.userservice.createUser(user1)
          .subscribe((user) => {
              this.user = user;
				console.log(this.userId + " " + user._id);
				this.userId = user._id;
				this.route.navigate(['/profile', user._id]);
        });
    });

  } else {
    alert('Passwords are not same');
  }
  }

  register(){
    var username = this.registerForm.value.username;
    var password = this.registerForm.value.password;
    var ver_password = this.registerForm.value.verifypassword;

    if(password != ver_password){
      this.errorMsg = "The passwords do not match. Please re-enter the passwords.";
      this.errorFlag = true;
    }
    else{
      this.userservice.register(username, password)
        .subscribe(
          (user: any) => {
            this.route.navigate(['/profile']);
          },
          (error: any) => {
            this.errorMsg = error._body;
            this.errorFlag = true;
          }
        );
    }
  }

  ngOnInit() {}

}
