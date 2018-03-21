import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Widget} from '../../../../models/widget.model.client';
import {WebsiteService} from '../../../../services/website.service.client';
import {WidgetService} from '../../../../services/widget.service.client';
import {PageService} from '../../../../services/page.service.client';
import {UserService} from '../../../../services/user.service.client';

@Component({
  selector: 'app-widget-youtube',
  templateUrl: './widget-youtube.component.html',
  styleUrls: ['./widget-youtube.component.css']
})
export class WidgetYoutubeComponent implements OnInit {
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

  constructor(private wdgservice: WidgetService,
              private pageservice: PageService,
              private webservice: WebsiteService,
              private userservice: UserService,
              private route: ActivatedRoute,
			  private router: Router) {
  }

  updateWidget(	text, url, width) {
    this.widget = new Widget(this.wdgId,
      'YOUTUBE',
      this.pgId,
      '1',
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
		  this.router.navigate(['/profile', this.userId,'websitelist',this.webId,'pagelist',this.pgId,'widgetlist']);
        });
    });
  }

  createWidget(size, text, width, url) {
    if (!url) {
      alert('Please give the youtube url');
      return;
    }
    const tempid = Math.floor(Math.random() * 100);
    this.wdgId = tempid.toString();
    this.widget = new Widget(this.wdgId,
      'YOUTUBE',
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
          this.wdgs = this.wdgs;
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
	  this.type = 'YOUTUBE';
      this.wdgservice.findWidgetById(this.wdgId).subscribe(
        (wdg) => {
          this.widget = wdg;
          this.text = this.widget.text;
          this.url = this.widget.url;
          this.size = this.widget.size;
          this.width = this.widget.width;
        });
	  this.wdgservice.findWidgetsByPageId(this.pgId).subscribe(
        (webs) => {
          this.wdgs = webs;
        });
    });
  }
}
