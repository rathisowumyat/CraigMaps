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
  ws: Website[] = WEBSITES;
  userId: String;
  webId: String;
  user: User;
  web: Website;
  constructor(private webservice: WebsiteService,
              private userservice: UserService,
              private route: ActivatedRoute) { }

  listWebsites(userId) {
    this.ws = this.webservice.findWebsitesByUser(userId);
  }

  listWebsitesById() {
    this.web = this.webservice.findWebsitesById(this.webId);
  }

  ngOnInit() {
    this.route.params.subscribe( params => {
      this.userId = params['userId'];
      this.webId = params['webId'];
      this.user = this.userservice.findUserById(this.userId);
    });
  }

}
