import {Component, OnInit, ViewChild} from '@angular/core';
import {Website} from '../../../models/website.model.client';
import {WebsiteService} from '../../../services/website.service.client';
import {ActivatedRoute, Route} from '@angular/router';
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
  ws: Website[];

  constructor(private webservice: WebsiteService,
              private userservice: UserService,
              private route: ActivatedRoute) { }

  createWebsite(name, desc) {
    if (!name) {
      alert ('Please give name of website');
      return;
    }
    const tempid = Math.floor(Math.random() * 100);
    this.webId = tempid.toString();
    this.webservice.createWebsite(this.userId,
      new Website(this.webId,
        name,
        this.userId,
        desc));
    const username = this.userservice.findUserById(this.userId).username;
    alert('Website \'' + name + ' \' created successfully for user ' + '\'' + username + '\'');
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['userId'];
      // this.webId = params['webId'];
      this.ws = this.webservice.findWebsitesByUser(this.userId);
    });
  }

}
