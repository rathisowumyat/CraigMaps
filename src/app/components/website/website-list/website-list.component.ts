import { Component, OnInit } from '@angular/core';
import {Website} from '../../../models/website.model.client';
import {WEBSITES} from '../../../services/website.mock';
import {WebsiteService} from '../../../services/website.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../../models/user.model.client';
import {UserService} from '../../../services/user.service.client';

@Component({
  selector: 'app-website-list',
  templateUrl: './website-list.component.html',
  styleUrls: ['./website-list.component.css']
})
export class WebsiteListComponent implements OnInit {
  ws: Website[];
  userId: String;
  webId: String;
  user: User;
  web: Website;
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
