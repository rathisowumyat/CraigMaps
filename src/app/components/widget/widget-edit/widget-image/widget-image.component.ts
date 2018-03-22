import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Widget} from '../../../../models/widget.model.client';
import {WebsiteService} from '../../../../services/website.service.client';
import {WidgetService} from '../../../../services/widget.service.client';
import {PageService} from '../../../../services/page.service.client';
import {UserService} from '../../../../services/user.service.client';
import {environment} from "../../../../../environments/environment";

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
  type: String;
  baseUrl: String;

  constructor(private wdgservice: WidgetService,
              private pageservice: PageService,
              private webservice: WebsiteService,
              private userservice: UserService,
              private route: ActivatedRoute,
			  private router: Router) {
    this.baseUrl = environment.baseUrl;
  }

  updateWidget(text, url, width) {
    this.widget = new Widget(this.wdgId,
      'IMAGE',
      this.pgId,
      '1',
      text,
      width,
      url);
    this.text = text;
    this.url = url;
    this.size = '1';
    this.width = width;
    this.route.params.subscribe(params => {
      this.userId = params['userId'];
      this.webId = params['webId'];
      this.pgId = params['pageId'];
      this.wdgId = params['wdgId'];
      this.url =  url;
      this.width = width;
      this.text =  text;
      this.size = '1';
      return this.wdgservice.updateWidget(this.wdgId, this.widget).subscribe(
        (wdg) => {
          this.wdgs = wdg;
		  this.router.navigate(['/profile', this.userId,'websitelist',this.webId,'pagelist',this.pgId,'widgetlist']);
        });
    });
  }

  createWidget(size, text, width, url) {
    if (!url) {
      alert('Please give the image url');
      return;
    }

    const tempid = Math.floor(Math.random() * 100);
    this.wdgId = tempid.toString();
    this.widget = new Widget(this.wdgId,
      'IMAGE',
      this.pgId,
      size,
      text,
      width,
      url);

    this.text = text;
    this.url = url;
    this.size = size;
    this.width = width;
    this.route.params.subscribe(params => {
      this.userId = params['userId'];
      this.webId = params['webId'];
      this.pgId = params['pageId'];
      this.wdgId = params['wdgId'];
      return this.wdgservice.createWidget(this.pgId, this.widget).subscribe(
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
  searchFlickr(){
    this.router.navigate(['/profile',this.userId,
      'websitelist',this.webId,'pagelist',this.pgId,'widgetlist', this.wdgId,'flickrsearch']);
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['userId'];
      this.webId = params['webId'];
      this.pgId = params['pageId'];
      this.wdgId = params['wdgId'];
	    this.type = 'IMAGE';
      this.wdgservice.findWidgetById(this.wdgId).subscribe(
        (wdg : Widget) => {
          this.widget = wdg;
          this.text = wdg.text;
          this.url = wdg.url;
          this.size = wdg.size;
          this.width = wdg.width;
        });
	  this.wdgservice.findWidgetsByPageId(this.pgId).subscribe(
        (webs) => {
          this.wdgs = webs;
        });
    });
  }
}
