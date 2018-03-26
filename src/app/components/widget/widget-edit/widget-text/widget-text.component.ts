import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../../services/user.service.client';
import {WidgetService} from '../../../../services/widget.service.client';
import {WebsiteService} from '../../../../services/website.service.client';
import {PageService} from '../../../../services/page.service.client';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-widget-text',
  templateUrl: './widget-text.component.html',
  styleUrls: ['./widget-text.component.css']
})
export class WidgetTextComponent implements OnInit {
  name: String;
  userId: String;
  webId: String;
  pgId: String;
  wdgId: String;
  size: String;
  text: String;
  width: String;
  url: String;
  wdgs: any[];
  widget: any;
  type: String;
  place: String;
  format: Boolean;
  rows: String;

  constructor(private wdgservice: WidgetService,
              private pageservice: PageService,
              private webservice: WebsiteService,
              private userservice: UserService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  updateWidget(text, rows, name, place, format) {
    this.widget = {
      '_id': this.wdgId,
      'type': 'TEXT',
      '_page': this.pgId,
      'text': text,
      'name': name,
      'placeholder': place,
      'formatted': format,
      'rows': rows
    }
    this.text=text;
    this.name=name;
    this.route.params.subscribe(params => {
      this.userId = params['userId'];
      this.webId = params['webId'];
      this.pgId = params['pageId'];
      this.wdgId = params['wdgId'];
      return this.wdgservice.updateWidget(this.wdgId, this.widget).subscribe(
        (wdg) => {
          this.wdgs = wdg;
          this.router.navigate(['/profile', this.userId,'websitelist',this.webId,'pagelist',this.pgId,'widgetlist']);
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
          this.wdgs = wdgs;
          this.router.navigate(['/profile', this.userId,'websitelist',this.webId,'pagelist',this.pgId,'widgetlist']);
        });
    });

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['userId'];
      this.webId = params['webId'];
      this.pgId = params['pageId'];
      this.wdgId = params['wdgId'];
      this.type = 'TEXT';
      this.wdgservice.findWidgetById(this.wdgId).subscribe(
        (wdg) => {
          this.widget = wdg;
          this.text = this.widget.text;
          this.url = this.widget.url;
          this.size = this.widget.size;
          this.width = this.widget.width;
          this.name = this.widget.name;
          this.type = 'TEXT';
        });
      this.wdgservice.findWidgetsByPageId(this.pgId).subscribe(
        (webs) => {
          this.wdgs = webs;
        });
    });
  }
}
