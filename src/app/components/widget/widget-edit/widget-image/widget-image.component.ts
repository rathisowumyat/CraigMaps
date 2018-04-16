import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WebsiteService} from '../../../../services/website.service.client';
import {WidgetService} from '../../../../services/widget.service.client';
import {PageService} from '../../../../services/page.service.client';
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-widget-image',
  templateUrl: './widget-image.component.html',
  styleUrls: ['./widget-image.component.css']
})
export class WidgetImageComponent implements OnInit {
  name: string;
  webId: string;
  pgId: string;
  wdgId: string;
  size: string;
  text: string;
  width: string;
  url: string;
  wdgs: any[];
  widget: any;
  type: string;
  baseUrl: string = environment.baseUrl;

  constructor(private wdgservice: WidgetService,
              private pageservice: PageService,
              private webservice: WebsiteService,
              private route: ActivatedRoute,
			        private router: Router) {  }

  updateWidget(text, url, width) {
    this.widget = {
      '_id': this.wdgId,
      'type': 'IMAGE',
      '_page': this.pgId,
      'text': text,
      'width': width,
      'url': url
    }
    this.text = text;
    this.url = url;
    this.size = '1';
    this.width = width;
    this.route.params.subscribe(params => {
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
		  this.router.navigate(['/profile', 'websitelist',this.webId,'pagelist',this.pgId,'widgetlist']);
        });
    });
  }

  deleteWidget() {
    this.route.params.subscribe(params => {
      this.webId = params['webId'];
      this.pgId = params['pageId'];
      this.wdgId = params['wdgId'];
      return this.wdgservice.deleteWidget(this.pgId, this.wdgId).subscribe(
        (wdgs) => {
          this.wdgs = wdgs;
		  this.router.navigate(['/profile', 'websitelist',this.webId,'pagelist',this.pgId,'widgetlist']);
        });
    });

  }
  searchFlickr(){
    this.router.navigate(['/profile',
      'websitelist',this.webId,'pagelist',this.pgId,'widgetlist', this.wdgId,'flickrsearch']);
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.webId = params['webId'];
      this.pgId = params['pageId'];
      this.wdgId = params['wdgId'];
	    this.type = 'IMAGE';
      this.wdgservice.findWidgetById(this.wdgId).subscribe(
        (wdg) => {
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
