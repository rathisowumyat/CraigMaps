import {Injectable} from '@angular/core';
import { Widget } from '../models/widget.model.client';
import {WIDGETS} from './widget.mock';
import {Website} from '../models/website.model.client';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';
import {environment} from '../../environments/environment';
import {WEBSITES} from './website.mock';

@Injectable()
export  class WidgetService {

  widgets: Widget[] = [];
  constructor(private http: Http){}
  baseUrl = environment.baseUrl;

  findAllWidgets() {
    return this.widgets;
  }

  updateWidget(pageId: String, newWidget: Widget) {
    const url =  'http://localhost:3100/api/widget/' + newWidget._id;
    return this.http.put(url, newWidget).map((response: Response) => {
      return response.json();
    });
  }

  findWidgetById(pageId: String, widgetId: String) {
    const url =  'http://localhost:3100/api/widget/' + widgetId;
    return this.http.get(url).map((response: Response) => {
      return response.json();
    });
  }

  deleteWidget(pageId: String, widgetId: String) {
    const url =  'http://localhost:3100/api/widget/' + widgetId;
    return this.http.delete(url).map((response: Response) => {
      return response.json();
    });
  }

  createWidget(pageId: String, newWidget: Widget) {
    const url = 'http://localhost:3100/api/page/' + pageId + '/widget';
    return this.http.post(url, newWidget).map((response: Response) => {
      return response.json();
    });
  }


  findWidgetsByPageId(pageId: String) {
    const url = 'http://localhost:3100/api/page/' + pageId + '/widget';
    return this.http.get(url).map((response: Response) => {
      return response.json();
    });
  }
}
