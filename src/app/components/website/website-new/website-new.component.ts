import {Component, OnInit, ViewChild} from '@angular/core';
import {WebsiteService} from '../../../services/website.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {SharedService} from '../../../services/shared.service';

@Component({
  selector: 'app-website-new',
  templateUrl: './website-new.component.html',
  styleUrls: ['./website-new.component.css']
})

export class WebsiteNewComponent implements OnInit {
  name: string;
  userId: string;
  webId: string;
  desc: string;
  ws: any[];

  constructor(private webservice: WebsiteService,
              private sharedService: SharedService,
              private route: ActivatedRoute,
			        private router: Router) { }

  createWebsite(name, desc) {
    if (!name) {
      alert ('Please give name of website');
      return;
    }
    this.route.params.subscribe(params => {
      this.userId = this.sharedService.user['_id'];
      const web = {
        'name': name,
        '_user': this.userId,
        'description': desc
      }
      return this.webservice.createWebsiteForUser(this.userId, web)
        .subscribe(
          (webs) => {
            this.ws = webs;
            this.router.navigate(['/profile', 'websitelist']);
          });
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = this.sharedService.user['_id'];
      return this.webservice.findWebsiteForUser(this.userId).subscribe(
        (webs) => {
          this.ws = webs;
        });
    });
  }

}
