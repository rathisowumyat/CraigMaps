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

  constructor(private userservice: UserService,
              private router: Router) {  }
  login() {
    this.username = this.loginForm.value.username;
    this.password = this.loginForm.value.password;
    const user: User = this.userservice.findUserByCredential(this.username, this.password);
    if (user) {
      this.router.navigate(['/profile', user._id]);
    } else {
      alert('Invalid username or password !');
    }
  }

  ngOnInit() {
  }
}
