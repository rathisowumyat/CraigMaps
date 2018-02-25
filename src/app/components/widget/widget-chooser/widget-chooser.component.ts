import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {WebsiteService} from '../../../services/website.service.client';
import {Page} from '../../../models/page.model.client';
import {PageService} from '../../../services/page.service.client';
import {UserService} from '../../../services/user.service.client';
import {WidgetService} from '../../../services/widget.service.client';
import {Widget} from '../../../models/widget.model.client';

@Component({
  selector: 'app-widget-chooser',
  templateUrl: './widget-chooser.component.html',
  styleUrls: ['./widget-chooser.component.css']
})
export class WidgetChooserComponent implements OnInit {
  name: String;
  userId: String;
  webId: String;
  pgId: String;
  wdgId: String;
  size: String;
  text: String;
  width: String;
  url: String;
  ps: Page[];

  constructor(private wdgservice: WidgetService,
              private pageservice: PageService,
              private webservice: WebsiteService,
              private userservice: UserService,
              private route: ActivatedRoute) {
  }

  createWidget(type, size, text, width, url) {
    if (!type) {
      alert('Please give type of the widget');
      return;
    }
    const tempid = Math.floor(Math.random() * 10000);
    this.wdgId = tempid.toString();
    this.wdgservice.createWidget(this.pgId,
      new Widget(this.wdgId,
        type,
        this.pgId,
        size,
        text,
        width,
        url));
    const username = this.userservice.findUserById(this.userId).username;
    const webname = this.webservice.findWebsitesById(this.webId);
    const pgname = this.pageservice.findPageById(this.pgId);
    alert('Widget of type ' + type + ' created successfully for Page \'' + pgname +
      '\' of user ' + '\'' + username + '\'' + ' in website ' + '\'' + webname + '\'');
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['userId'];
      this.webId = params['webId'];
      this.pgId = params['pageId'];
      // this.ps = this.pageservice.findPageByWebsiteId(this.webId);
    });
  }
}
