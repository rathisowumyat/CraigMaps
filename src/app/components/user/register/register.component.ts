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
firstname: String;
lastname: String;

  constructor(private userservice: UserService,
              private router: ActivatedRoute,
			  private route: Router) { }

  createUser(username, password, same) {
    if ((!username) || (!password)) {
      alert ('Please give username and password');
      return;
    }
  if ( password === same ) {
      const tempid = (Math.floor(Math.random() * 10))+"";
      this.userId = tempid.toString();
      const user1 = new User(this.userId,
      username,
      password,
      username,
      username);
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

  ngOnInit() {  }

}
