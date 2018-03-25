import {Component, OnInit, ViewChild} from '@angular/core';

import {WebsiteService} from '../../../services/website.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {UserService} from '../../../services/user.service.client';

@Component({
  selector: 'app-website-new',
  templateUrl: './website-new.component.html',
  styleUrls: ['./website-new.component.css']
})
export class WebsiteNewComponent implements OnInit {
  name: String;
  userId: String;
  webId: String;
  desc: String;
  ws: any[];

  constructor(private webservice: WebsiteService,
              private userservice: UserService,
              private route: ActivatedRoute,
			  private router: Router) { }

  createWebsite(name, desc) {
    if (!name) {
      alert ('Please give name of website');
      return;
    }
    this.route.params.subscribe(params => {
	this.userId = params['userId'];
	const tempid = (Math.floor(Math.random() * 100)) + "";
    this.webId = tempid.toString();
    const web = {
      'name': name,
      '_user': this.userId,
      'description': desc
    }
      return this.webservice.createWebsiteForUser(this.userId, web)
	  .subscribe(
        (webs) => {
          this.ws = webs;
		  this.router.navigate(['/profile', this.userId,'websitelist']);
        });
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['userId'];
      return this.webservice.findWebsiteForUser(this.userId).subscribe(
        (webs) => {
          this.ws = webs;
        });
    });
  }

}
