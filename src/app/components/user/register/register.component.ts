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
  username: string;
  password: string;
  same: string;
  user: any;
  userId: string;
  firstname: string;
  lastname: string;
  errorFlag: boolean = false;
  errorMsg: string = "";
  @ViewChild('f') registerForm: NgForm;
  options = new RequestOptions();

  constructor(private userservice: UserService,
              private router: ActivatedRoute,
			        private route: Router,
              private sharedService: SharedService) { }

  register(){
    var username = this.registerForm.value.username;
    var password = this.registerForm.value.password;
    var ver_password = this.registerForm.value.verifypassword;

    if(password != ver_password){
      this.errorMsg = "The passwords do not match. Please re-enter the passwords.";
      this.errorFlag = true;
    }
    else{
      var u = this.userservice.findUserByCredentials(username, password);
      if (u) {
        alert('User already exists!');
        return;
      }
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
