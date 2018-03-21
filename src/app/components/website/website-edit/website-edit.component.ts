import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {User} from '../../../models/user.model.client';
import {WebsiteService} from '../../../services/website.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {Website} from '../../../models/website.model.client';
import {UserService} from '../../../services/user.service.client';
import {Page} from '../../../models/page.model.client';

@Component({
  selector: 'app-website-edit',
  templateUrl: './website-edit.component.html',
  styleUrls: ['./website-edit.component.css']
})
export class WebsiteEditComponent implements OnInit {
  name: String;
  userId: String;
  webId: String;
  ws: Website[];
  username: String;
  desc: String;

  errorMsg = 'Invalid developer!';

  constructor(private webservice: WebsiteService,
              private userservice: UserService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  updateWebsite(name, desc) {
    this.route.params.subscribe(params => {
      this.userId = params['userId'];
      this.webId = params['webId'];
      const website = new Website(this.webId,
        name,
        this.userId,
        desc);
      return this.webservice.updateWebsite(this.userId, website).subscribe(
        (webs) => {
          this.ws = webs;
          this.router.navigate(['/profile', this.userId, 'websitelist']);
        });

    });

  }

  deleteWebsite() {
    this.route.params.subscribe(params => {
      this.userId = params['userId'];
      this.webId = params['webId'];
      return this.webservice.deleteWebsite(this.userId, this.webId).subscribe(
        (webs) => {
          this.ws = webs;
          this.router.navigate(['/profile', this.userId, 'websitelist']);
        });
    });

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['userId'];
      this.webId = params['webId'];
      this.webservice.findWebsiteById(this.userId, this.webId).subscribe(
        (web) => {
          this.name = web.name;
          this.desc = web.description;
        });
      this.webservice.findWebsiteForUser(this.userId).subscribe(
        (webs) => {
          this.ws = webs;
        });
    });
  }

}
