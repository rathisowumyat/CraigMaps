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
  username: string;
  password: string;
  errorFlag: boolean = false;
  errorMsg: string = "";
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
        (data: any) => {
          this.router.navigate(['/profile']);
        },
        (error: any) => {
          this.errorMsg = "Username and password do not match. Please enter the correct credentials";
          this.errorFlag = true;
        }
      );
  }

  ngOnInit() {}
}
