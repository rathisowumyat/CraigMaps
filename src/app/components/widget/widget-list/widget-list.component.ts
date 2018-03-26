import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {WebsiteService} from '../../../services/website.service.client';
import {WidgetService} from '../../../services/widget.service.client';
import {PageService} from '../../../services/page.service.client';
import {UserService} from '../../../services/user.service.client';
import {DomSanitizer, Title} from "@angular/platform-browser";
import {environment} from '../../../../environments/environment';

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
  wdgs: any[] = [];
  widget: any;
  baseUrl = environment.baseUrl;


  constructor(private wdgservice: WidgetService,
              private pageservice: PageService,
              private webservice: WebsiteService,
              private userservice: UserService,
              private route: ActivatedRoute,
			  private sanitizer: DomSanitizer) { }

  listWidgets() {
    this.route.params.subscribe(params => {
      this.userId = params['userId'];
      this.webId = params['webId'];
      this.pgId = params['pageId'];
      return this.wdgservice.findWidgetsByPageId(this.pgId).subscribe(
        (webs) => {
          this.wdgs = webs;
        });
    });
  }

    embedURL(url: String){
    const urlSegments = url.split('/');
    const embeddedUrl = 'https://www.youtube.com/embed/' + urlSegments.pop();
    return this.sanitizer.bypassSecurityTrustResourceUrl(embeddedUrl);
  }

   reorderWidgets(index) {
    this.wdgservice.reorderWidgets(this.pgId, this.wdgs[index['startIndex']], index['startIndex'], index['endIndex'])
        .subscribe(
        (widgets) => {},
        (error) => {}
      );
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['userId'];
      this.webId = params['webId'];
      this.pgId = params['pageId'];
      return this.wdgservice.findWidgetsByPageId(this.pgId).subscribe(
        (webs) => {
          this.wdgs = webs;
        });
    });
  }
}
