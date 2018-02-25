import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Widget} from '../../../../models/widget.model.client';
import {WebsiteService} from '../../../../services/website.service.client';
import {WidgetService} from '../../../../services/widget.service.client';
import {PageService} from '../../../../services/page.service.client';
import {UserService} from '../../../../services/user.service.client';

@Component({
  selector: 'app-widget-image',
  templateUrl: './widget-image.component.html',
  styleUrls: ['./widget-image.component.css']
})
export class WidgetImageComponent implements OnInit {
  name: String;
  userId: String;
  webId: String;
  pgId: String;
  wdgId: String;
  size: String;
  text: String;
  width: String;
  url: String;
  wdgs: Widget[];
  widget: Widget;

  constructor(private wdgservice: WidgetService,
              private pageservice: PageService,
              private webservice: WebsiteService,
              private userservice: UserService,
              private route: ActivatedRoute) { }

  updateWidget(type, size, text, width, url) {
    this.wdgservice.updateWidget(this.wdgId,
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
    alert('Widget of type ' + type + ' updated successfully for Page \'' + pgname +
      '\' of user ' + '\'' + username + '\'' + ' in website ' + '\'' + webname + '\'');
  }

  deleteWidget() {
    const webname = this.webservice.findWebsitesById(this.webId).name;
    const username = this.userservice.findUserById(this.userId).username;
    const pgname = this.pageservice.findPageById(this.pgId);
    const type = this.wdgservice.findWidgetById(this.wdgId).widgetType;
    this.wdgservice.deleteWidget(this.wdgId);
    alert('Widget of type ' + type + ' deleteted successfully for Page \'' + pgname +
      '\' of user ' + '\'' + username + '\'' + ' in website ' + '\'' + webname + '\'');
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['userId'];
      this.webId = params['webId'];
      this.pgId = params['pageId'];
      this.wdgId = params['wdgId'];
      this.wdgs = this.wdgservice.findWidgetsByPageId(this.pgId);
    });
  }
}
