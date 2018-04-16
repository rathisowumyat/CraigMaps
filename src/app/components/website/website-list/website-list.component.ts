import { Component, OnInit } from '@angular/core';
import {WebsiteService} from '../../../services/website.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {SharedService} from '../../../services/shared.service';

@Component({
  selector: 'app-website-list',
  templateUrl: './website-list.component.html',
  styleUrls: ['./website-list.component.css']
})

export class WebsiteListComponent implements OnInit {
  ws: any[];
  userId: string;
  webId: string;
  user: any;
  web: any;
  constructor(private webservice: WebsiteService,
              private sharedService: SharedService,
              private route: ActivatedRoute) { }

  listWebsites(userId) {
    this.route.params.subscribe(params => {
      this.userId = this.sharedService.user['_id'];
      this.webId = params['webId'];
      return this.webservice.findWebsiteForUser(this.userId).subscribe(
        (webs) => {
          this.ws = webs;
        });
    });
  }

  listWebsitesById() {
    this.route.params.subscribe(params => {
      this.userId = this.sharedService.user['_id'];
      this.webId = params['webId'];
      return this.webservice.findWebsiteById(this.userId, this.webId).subscribe(
        (web) => {
          this.web = web;
        });
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = this.sharedService.user['_id'];
      this.webId = params['webId'];
      return this.webservice.findWebsiteForUser(this.userId).subscribe(
        (webs) => {
          this.ws = webs;
        });
    });
  }

}
