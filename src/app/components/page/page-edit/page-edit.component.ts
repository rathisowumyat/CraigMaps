import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {WebsiteService} from '../../../services/website.service.client';
import {Page} from '../../../models/page.model.client';
import {PageService} from '../../../services/page.service.client';
import {UserService} from '../../../services/user.service.client';
import {Website} from '../../../models/website.model.client';

@Component({
  selector: 'app-page-edit',
  templateUrl: './page-edit.component.html',
  styleUrls: ['./page-edit.component.css']
})

export class PageEditComponent implements OnInit {
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

  updatePage(name, desc) {
    this.pageservice.updatePage(this.pgId,
      new Page(this.pgId,
        name,
        this.webId,
        desc));
    const webname = this.webservice.findWebsitesById(this.webId).name;
    const username = this.userservice.findUserById(this.userId).username;
    alert('Page \'' + name + '\' of Website \'' + webname + '\'' + ' updated successfully for user ' + '\'' + username + '\'');
  }

  deletePage() {
    const pgname = this.pageservice.findPageById(this.pgId).name;
    const webname = this.webservice.findWebsitesById(this.webId).name;
    const username = this.userservice.findUserById(this.userId).username;
    this.webservice.deleteWebsite(this.pgId);
    alert('Page \'' + pgname + '\' of Website \'' + webname + '\'' + ' deleted successfully for user ' + '\'' + username + '\'');
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['userId'];
      this.webId = params['webId'];
      this.pgId = params['pageId'];
      this.ps = this.pageservice.findPageByWebsiteId(this.webId);
    });
  }

}
