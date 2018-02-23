import { User } from '../../../models/user.model.client';
import { UserService } from '../../../services/user.service.client';
import { Router } from '@angular/router';
import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  username: String;
  password: String;
  errorFlag: boolean;
  @ViewChild('f') loginForm: NgForm;
  errorMsg = 'Invalid username or password !';

  constructor(private userservice: UserService,
              private router: Router) {  }

  // login(username: String, password: String) {
  //   const user: User = this.userservice.findUserByCredential(username, password);
  //   if (user) {
  //     this.router.navigate(['/profile', user._id]);
  //   }
  // }

  login() {
    this.username = this.loginForm.value.username;
    this.password = this.loginForm.value.password;
    // alert(this.username);

    const user: User = this.userservice.findUserByCredential(this.username, this.password);
    console.log(this.username);
    if (user) {
      console.log(user)
      this.router.navigate(['/profile', user._id]);
    }
    // } else {
    //   alert(this.errorMsg);
    // }
  }


  ngOnInit() {
  }
}
