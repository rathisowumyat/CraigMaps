import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {WidgetService} from '../../../../services/widget.service.client';
import {WebsiteService} from '../../../../services/website.service.client';
import {Widget} from '../../../../models/widget.model.client';
import {PageService} from '../../../../services/page.service.client';
import {UserService} from '../../../../services/user.service.client';

@Component({
  selector: 'app-widget-iframe',
  templateUrl: './widget-iframe.component.html',
  styleUrls: ['./widget-iframe.component.css']
})
export class WidgetIframeComponent implements OnInit {
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
              private route: ActivatedRoute) {
  }

  updateWidget(type, size, text, width, url) {
    this.widget = new Widget(this.wdgId,
      type,
      this.pgId,
      size,
      text,
      width,
      url);
    this.route.params.subscribe(params => {
      this.userId = params['userId'];
      this.webId = params['webId'];
      this.pgId = params['pageId'];
      this.wdgId = params['wdgId'];
      return this.wdgservice.updateWidget(this.wdgId, this.widget).subscribe(
        (wdg) => {
          this.wdgs = this.wdgs;
        });
    });
  }

  createWidget(name, type, size, text, width, url) {
    if (!type) {
      alert('Please give type of the widget');
      return;
    }
    if (type === 'HEADER' && !text) {
      alert('Please give the text of the HEADER');
      return;
    }
    if (type === 'IMAGE' && !url) {
      alert('Please give the image url');
      return;
    }
    if (type === 'YOUTUBE' && !url) {
      alert('Please give the youtube url');
      return;
    }
    const tempid = Math.floor(Math.random() * 100);
    this.wdgId = tempid.toString();
    this.widget = new Widget(this.wdgId,
      type,
      this.pgId,
      size,
      text,
      width,
      url);

    this.route.params.subscribe(params => {
      this.userId = params['userId'];
      this.webId = params['webId'];
      this.pgId = params['pageId'];
      this.wdgId = params['wdgId'];
      return this.wdgservice.createWidget(this.pgId, this.widget).subscribe(
        (wdg) => {
          this.wdgs = this.wdgs;
        });
    });
  }

  deleteWidget() {
    this.route.params.subscribe(params => {
      this.userId = params['userId'];
      this.webId = params['webId'];
      this.pgId = params['pageId'];
      this.wdgId = params['wdgId'];
      return this.wdgservice.deleteWidget(this.pgId, this.wdgId).subscribe(
        (wdgs) => {
          this.wdgs = this.wdgs;
        });
    });

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['userId'];
      this.webId = params['webId'];
      this.pgId = params['pageId'];
      this.wdgId = params['wdgId'];
      return this.wdgservice.findWidgetById(this.pgId, this.wdgId).subscribe(
        (wdg) => {
          this.widget = wdg;
          this.name = this.widget.name;
          this.text = this.widget.text;
          this.url = this.widget.url;
          this.size = this.widget.size;
          this.width = this.widget.width;
        });
    });
  }
}
