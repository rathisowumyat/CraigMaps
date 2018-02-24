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
  userId: String;

  constructor(private userservice: UserService,
              private route: Router) { }

  createUser(username, password, same) {
    if ((!username) || (!password)) {
      alert ('Please give username and password');
      return;
    }
  if ( password === same ) {
      const tempid = Math.floor(Math.random() * 10);
      this.userId = tempid.toString();
      this.user = new User(this.userId ,
      this.username,
      this.password,
      this.username,
      this.username);
      this.userservice.createUser(this.user);
      this.route.navigate(['/profile', this.user._id]);
  } else {
    alert('Passwords are not same');
  }
  }

  ngOnInit() {  }

}
