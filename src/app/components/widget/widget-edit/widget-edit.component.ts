import {Component, OnInit, ViewChild} from '@angular/core';
import {WidgetService} from '../../../services/widget.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {WebsiteService} from '../../../services/website.service.client';
import {PageService} from '../../../services/page.service.client';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-widget-edit',
  templateUrl: './widget-edit.component.html',
  styleUrls: ['./widget-edit.component.css']
})

export class WidgetEditComponent implements OnInit {
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
  file: any;
  rows: number;
  place: string;
  format: string;
  baseUrl: string = environment.baseUrl;

  constructor(private wdgservice: WidgetService,
              private pageservice: PageService,
              private webservice: WebsiteService,
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

    this.widget = {
        'type': this.type,
        '_page': this.pgId,
        'size': size,
        'text': text,
        'width': width,
        'url': url
    }
    this.route.params.subscribe(params => {
      this.webId = params['webId'];
      this.pgId = params['pageId'];
	    this.type = params['type'];
	    this.url =  url;
	    this.width = width;
	    this.text =  text;
	    this.size = size;
      return this.wdgservice.createWidget(this.pgId, this.widget).subscribe(
        (wdgs) => {
          this.wdgs = wdgs;
		    this.router.navigate(['/profile', 'websitelist', this.webId, 'pagelist', this.pgId, 'widgetlist']);
        });
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.webId = params['webId'];
      this.pgId = params['pageId'];
	    this.type = params['type'];
      this.text = 'sample text';
      this.url = this.baseUrl;
      this.size = '1';
      this.width = '100%';

     this.wdgservice.findWidgetsByPageId(this.pgId).subscribe(
        (webs) => {
          this.wdgs = webs;
        });
    });
  }
}
