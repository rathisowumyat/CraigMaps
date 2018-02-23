import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {UserService} from '../../../services/user.service.client';
import {User} from '../../../models/user.model.client';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  username: String;
  password: String;
  same: String;
  user: User;

  constructor(private userservice: UserService,
              private route: Router) { }

  createUser(username, password, same) {
    if ((!username) || (!password)) {
      alert ('Please give username and password');
      return;
    }
  if ( password === same ) {
    this.user = new User('55',
      this.username,
      this.password,
      this.username,
      this.username);
  } else {
    alert('Passwords are not same');
  }

  this.userservice.createUser(this.user);

  this.route.navigate(['/profile', this.user._id]);
  }

  ngOnInit() {
  }

}
