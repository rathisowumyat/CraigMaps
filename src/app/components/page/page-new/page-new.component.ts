import { Component, OnInit } from '@angular/core';
import {Website} from '../../../models/website.model.client';
import {ActivatedRoute} from '@angular/router';
import {WebsiteService} from '../../../services/website.service.client';
import {UserService} from '../../../services/user.service.client';
import {Page} from '../../../models/page.model.client';
import {PageService} from '../../../services/page.service.client';

@Component({
  selector: 'app-page-new',
  templateUrl: './page-new.component.html',
  styleUrls: ['./page-new.component.css']
})
export class PageNewComponent implements OnInit {
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

  createPage(name, desc) {
    if (!name) {
      alert ('Please give name of page');
      return;
    }
    const tempid = Math.floor(Math.random() * 1000);
    this.pgId = tempid.toString();
    this.pageservice.createPage(this.webId,
      new Page(this.pgId,
        name,
        this.webId,
        desc));
    const username = this.userservice.findUserById(this.userId).username;
    const webname = this.webservice.findWebsitesById(this.webId).name;
    alert('Page \'' + name + '\' created successfully for user ' + '\'' + username + '\'' + ' in website ' + '\'' + webname + '\'');
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['userId'];
      this.webId = params['webId'];
      this.ps = this.pageservice.findPageByWebsiteId(this.webId);
    });
  }

}
