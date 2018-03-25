import { Component, OnInit } from '@angular/core';
import {WebsiteService} from '../../../services/website.service.client';
import {ActivatedRoute, Router} from '@angular/router';

import {UserService} from '../../../services/user.service.client';

@Component({
  selector: 'app-website-list',
  templateUrl: './website-list.component.html',
  styleUrls: ['./website-list.component.css']
})
export class WebsiteListComponent implements OnInit {
  ws: any[];
  userId: String;
  webId: String;
  user: any;
  web: any;
  constructor(private webservice: WebsiteService,
              private userservice: UserService,
              private route: ActivatedRoute) { }

  listWebsites(userId) {
    this.route.params.subscribe(params => {
      this.userId = params['userId'];
      this.webId = params['webId'];
      return this.webservice.findWebsiteForUser(this.userId).subscribe(
        (webs) => {
          this.ws = webs;
        });
    });
  }

  listWebsitesById() {
    this.route.params.subscribe(params => {
      this.userId = params['userId'];
      this.webId = params['webId'];
      return this.webservice.findWebsiteById(this.userId, this.webId).subscribe(
        (web) => {
          this.web = web;
        });
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['userId'];
      this.webId = params['webId'];
      return this.webservice.findWebsiteForUser(this.userId).subscribe(
        (webs) => {
          this.ws = webs;
        });
    });
  }

}
