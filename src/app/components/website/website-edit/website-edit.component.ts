import {Component, OnInit, ViewChild} from '@angular/core';
import {WebsiteService} from '../../../services/website.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {SharedService} from '../../../services/shared.service';

@Component({
  selector: 'app-website-edit',
  templateUrl: './website-edit.component.html',
  styleUrls: ['./website-edit.component.css']
})

export class WebsiteEditComponent implements OnInit {
  name: string;
  userId: string;
  webId: string;
  ws: any[];
  username: string;
  desc: string;
  errorMsg = 'Invalid developer!';

  constructor(private webservice: WebsiteService,
              private sharedService: SharedService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  updateWebsite(name, desc) {
    this.route.params.subscribe(params => {
      this.userId = this.sharedService.user['_id'];
      this.webId = params['webId'];
      const website = {'_id': this.webId,
        'name': name,
        '_user': this.userId,
        'description': desc
      }
      return this.webservice.updateWebsite(this.userId, website).subscribe(
        (webs) => {
          this.ws = webs;
          this.router.navigate(['/profile', 'websitelist']);
        });

    });

  }

  deleteWebsite() {
    this.route.params.subscribe(params => {
      this.userId = this.sharedService.user['_id'];
      this.webId = params['webId'];
      return this.webservice.deleteWebsite(this.userId, this.webId).subscribe(
        (webs) => {
          this.ws = webs;
          this.router.navigate(['/profile', 'websitelist']);
        });
    });

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = this.sharedService.user['_id'];
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
