import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {WebsiteService} from '../../../services/website.service.client';
import {Page} from '../../../models/page.model.client';
import {PageService} from '../../../services/page.service.client';
import {UserService} from '../../../services/user.service.client';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css']
})
export class PageListComponent implements OnInit {
  name: String;
  userId: String;
  webId: String;
  pgId: String;
  desc: String;
  ps: Page[];

  constructor(private pageservice: PageService,
              private webservice: WebsiteService,
              private userservice: UserService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['userId'];
      this.webId = params['webId'];
	  this.pgId = params['pageId'];
      return this.pageservice.findPageForWebsite(this.webId).subscribe(
        (pages) => {
          this.ps = pages;
        });
    });
  }
}
