import { UserService } from '../../../services/user.service.client';
import { Router } from '@angular/router';
import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {SharedService} from '../../../services/shared.service';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  username: String;
  password: String;
  errorFlag: boolean;
  baseUrl = environment.baseUrl;

  @ViewChild('f') loginForm: NgForm;

  constructor(private userservice: UserService,
              private router: Router,
              private sharedService: SharedService) {  }
  login() {
    this.username = this.loginForm.value.username;
    this.password = this.loginForm.value.password;
    // calling client side userservice to send login information
    this.userservice.login(this.username, this.password)
      .subscribe(
        (user) => {
          this.sharedService.user = user;
          console.log(user);
          this.router.navigate(['/profile', user._id])}, // data.userId??
        (error: any) => {
          console.log(error);
        }
      );

  // return this.userservice.findUserByCredentials(this.username, this.password)
  //     .subscribe((user) => {
  //       if (user._id) {
  //         this.router.navigate(['/profile', user._id ]);
  //       } else {
  //         alert('Invalid username or password !');
  //       }
	// 	return;
  //     });
  }

  ngOnInit() {}

}
