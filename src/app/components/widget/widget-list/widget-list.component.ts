import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {WebsiteService} from '../../../services/website.service.client';
import {WidgetService} from '../../../services/widget.service.client';
import {Page} from '../../../models/page.model.client';
import {PageService} from '../../../services/page.service.client';
import {UserService} from '../../../services/user.service.client';
import {Widget} from '../../../models/widget.model.client';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-widget-list',
  templateUrl: './widget-list.component.html',
  styleUrls: ['./widget-list.component.css']
})

export class WidgetListComponent implements OnInit {
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

  listWidgets() {
    this.wdgs = this.wdgservice.findWidgetsByPageId(this.pgId);
  }

  listWidgetsById() {
    this.widget = this.wdgservice.findWidgetById(this.wdgId);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['userId'];
      this.webId = params['webId'];
      this.pgId = params['pageId'];
      this.wdgs = this.wdgservice.findWidgetsByPageId(this.pgId);
    });
  }
}
