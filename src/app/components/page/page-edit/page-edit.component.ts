import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
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
  ps: any[];
  page: any = {};
  //ps: Page[];

  constructor(private pageservice: PageService,
              private webservice: WebsiteService,
              private userservice: UserService,
              private route: ActivatedRoute,
			  private router: Router) { }

  updatePage(name, desc) {
    this.route.params.subscribe(params => {
      this.userId = params['userId'];
      this.webId = params['webId'];
      this.pgId = params['pageId'];
	  const pg = new Page(this.pgId,
      name,
      this.webId,
      desc);
      return this.pageservice.updatePage(this.webId, pg)
        .subscribe((pages) => {
          this.ps = pages;
		  this.router.navigate(['/profile', this.userId,'websitelist',this.webId,'pagelist']);
        });
    });
  }

  deletePage() {
    this.route.params.subscribe(params => {
      this.userId = params['userId'];
      this.webId = params['webId'];
      this.pgId = params['pageId'];
      return this.pageservice.deletePage(this.webId, this.pgId)
        .subscribe((pages) => {
          this.ps = pages;
		  this.router.navigate(['/profile', this.userId,'websitelist',this.webId,'pagelist']);
        });
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['userId'];
      this.webId = params['webId'];
      this.pgId = params['pageId'];
      this.pageservice.findPageById(this.webId, this.pgId).subscribe(
        (page) => {
            this.name = page.name;
            this.desc = page.description;
        });
      this.pageservice.findPageForWebsite(this.webId).subscribe(
        (pages) => {
          this.ps = pages;
        });
    });
  }

}
