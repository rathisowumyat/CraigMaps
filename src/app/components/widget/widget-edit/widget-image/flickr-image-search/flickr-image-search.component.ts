import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FlickrService} from "../../../../../services/flickr.service.client";
import {WidgetService} from "../../../../../services/widget.service.client";
import {Widget} from '../../../../../models/widget.model.client';

@Component({
  selector: 'app-flickr-image-search',
  templateUrl: './flickr-image-search.component.html',
  styleUrls: ['./flickr-image-search.component.css']
})
export class FlickrImageSearchComponent implements OnInit {

  searchText: String;
  photos: any;
  websiteId: String;
  pageId: String;
  widgetId: String;
  widget: Widget;
  wdgs: Widget[];
  userId: String;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private flickrService: FlickrService,
              private widgetService: WidgetService) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        params => {
          this.userId = params['userId'];
          this.websiteId = params['webId'];
          this.pageId = params['pageId'];
          this.widgetId = params['wdgId'];

          this.widgetService.findWidgetById(this.widgetId)
            .subscribe((widget) => {
              this.widget = widget;
            });
        }
      );
  }

  searchPhotos() {
    this.flickrService
      .searchPhotos(this.searchText)
      .subscribe(
        (data: any) => {
          let val = data._body;
          val = val.replace('jsonFlickrApi(', '');
          val = val.substring(0, val.length - 1);
          val = JSON.parse(val);
          this.photos = val.photos;
        }
      );
  }

  selectPhoto(photo) {
    let url = 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server;
    url += '/' + photo.id + '_' + photo.secret + '_b.jpg';
    if(this.widget) {
      this.widget.url = url;
      this.widgetService.updateWidget(this.pageId, this.widget)
        .subscribe((wdgs) => {
          this.wdgs = wdgs;
          this.router.navigate(['/profile', this.userId,
            'websitelist', this.websiteId, 'pagelist', this.pageId, 'widgetlist']);
        });
    } else {
      const _idt = (Math.floor(Math.random() * 100)) + "";
      this.widget = new Widget(_idt, 'IMAGE',this.pageId, '1',
        'flickr image','100%', url);
      this.widgetService.createWidget(this.pageId, this.widget).subscribe(
        (wdgs) => {
          this.wdgs = wdgs;
          this.router.navigate(['/profile', this.userId,'websitelist',
            this.websiteId,'pagelist',this.pageId,'widgetlist']);
        });
    }
  }
}
