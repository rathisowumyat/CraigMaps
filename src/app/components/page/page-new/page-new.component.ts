import { Component, OnInit } from '@angular/core';
import {Website} from '../../../models/website.model.client';
import {ActivatedRoute, Router} from '@angular/router';
import {WebsiteService} from '../../../services/website.service.client';
import {UserService} from '../../../services/user.service.client';
import {Page} from '../../../models/page.model.client';
import {PageService} from '../../../services/page.service.client';
import {User} from '../../../models/user.model.client';

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
              private route: ActivatedRoute,
			  private router: Router) { }

  createPage(name, desc) {
    if (!name) {
      alert ('Please give name of page');
      return;
    }
    const tempid = Math.floor(Math.random() * 1000);
    this.pgId = tempid.toString();
    const pg = new Page(this.pgId,
      name,
      this.webId,
      desc);
    this.route.params.subscribe(params => {
      this.userId = params['userId'];
      return this.pageservice.createPage(this.webId, pg)
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
	  
      this.pageservice.findPageForWebsite(this.webId).subscribe(
        (pages) => {
          this.ps = pages;
        });
    });
  }
}
