import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {WebsiteService} from '../../../services/website.service.client';
import {PageService} from '../../../services/page.service.client';
import {WidgetService} from '../../../services/widget.service.client';
import {SharedService} from '../../../services/shared.service';

@Component({
  selector: 'app-widget-chooser',
  templateUrl: './widget-chooser.component.html',
  styleUrls: ['./widget-chooser.component.css']
})

export class WidgetChooserComponent implements OnInit {
  name: string;
  userId: string;
  webId: string;
  pgId: string;
  wdgId: string;
  size: string;
  text: string;
  width: string;
  url: string;
  wdgs: any[];

  constructor(private wdgservice: WidgetService,
              private pageservice: PageService,
              private webservice: WebsiteService,
              private sharedService: SharedService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = this.sharedService.user['_id'];
      this.webId = params['webId'];
      this.pgId = params['pageId'];
      //this.wdgId = params['wdgId'];
      //return this.wdgservice.findWidgetsByPageId(this.pgId).subscribe(
        //(webs) => {
         // this.wdgs = webs;
        //});
    });
  }
}
