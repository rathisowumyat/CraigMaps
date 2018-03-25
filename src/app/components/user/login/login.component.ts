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

  constructor(private userservice: UserService,
              private router: Router) {  }
  login() {
    this.username = this.loginForm.value.username;
    this.password = this.loginForm.value.password;
    return this.userservice.findUserByCredentials(this.username, this.password)
      .subscribe((user) => {
        if (user._id) {
          this.router.navigate(['/profile', user._id ]);
        } else {
          alert('Invalid username or password !');
        }
		return;
      });
  }

  ngOnInit() {}

}
