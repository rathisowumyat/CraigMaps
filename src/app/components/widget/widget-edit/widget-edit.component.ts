import {Component, OnInit, ViewChild} from '@angular/core';
import {WidgetService} from '../../../services/widget.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {WebsiteService} from '../../../services/website.service.client';
import {PageService} from '../../../services/page.service.client';
import {UserService} from '../../../services/user.service.client';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-widget-edit',
  templateUrl: './widget-edit.component.html',
  styleUrls: ['./widget-edit.component.css']
})
export class WidgetEditComponent implements OnInit {
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
  file: any;
  rows: number;
  baseUrl: String = environment.baseUrl;

  constructor(private wdgservice: WidgetService,
              private pageservice: PageService,
              private webservice: WebsiteService,
              private userservice: UserService,
              private route: ActivatedRoute,
			        private router: Router) {this.baseUrl = environment.baseUrl; }


  createWidget(size, text, width, url) {
    if (this.type === 'HEADER' && !text) {
      alert('Please give the text of the HEADER');
      return;
    }
	if (this.type === 'HTML' && !text) {
      alert('Please give the text of the HTML');
      return;
    }

    if (this.type === 'YOUTUBE' && !url) {
      alert('Please give the youtube url');
      return;
    }
    if (this.type === 'TEXT' && !url) {
      alert('Please give the youtube url');
      return;
    }
    const tempid = Math.floor(Math.random() * 100);
    this.wdgId = tempid.toString();
    this.widget = {
        'type': this.type,
        '_page': this.pgId,
        'size': size,
        'text': text,
        'width': width,
        'url': url
    }
    this.route.params.subscribe(params => {
      this.userId = params['userId'];
      this.webId = params['webId'];
      this.pgId = params['pageId'];
      this.wdgId = params['wdgId'];
	    this.type = params['type'];
	    this.url =  url;
	    this.width = width;
	    this.text =  text;
	    this.size = size;
      return this.wdgservice.createWidget(this.pgId, this.widget).subscribe(
        (wdgs) => {
          this.wdgs = wdgs;
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
	    this.type = params['type'];
      this.text = 'sample text';
      this.url = this.baseUrl;
      this.size = '1';
      this.width = '100%';

	  if(this.wdgId) {
      this.wdgservice.findWidgetById(this.wdgId).subscribe(
        (wdg) => {
          this.widget = wdg;
          // this.name = this.widget.name;
          // this.type = this.widget.widgetType;
          // this.text = this.widget.text;
          // this.url = this.baseUrl;
          // this.size = this.widget.size;
          // this.width = this.widget.width;
        });
	  }
     this.wdgservice.findWidgetsByPageId(this.pgId).subscribe(
        (webs) => {
          this.wdgs = webs;
        });
    });
  }
}
