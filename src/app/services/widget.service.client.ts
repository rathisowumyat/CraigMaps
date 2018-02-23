import {Injectable} from '@angular/core';
import { Widget } from '../models/widget.model.client';
import {WIDGETS} from './widget.mock';
import {Website} from '../models/website.model.client';

@Injectable()
export  class WidgetService {

  widgets: Widget[] = WIDGETS;

  createWidget(pageId, widget) {
    this.widgets.push(new Widget(widget._id, widget.type, pageId, widget.size,
                                  widget.text, widget.width, widget.url));
  }

  findWidgetsByPageId(pageId: String) {
    const resultSet = [];
    for ( const i in this.widgets) {
      if (this.widgets[i].pageId === pageId) {
        resultSet.push(this.widgets[i]);
      }
    }
    return resultSet;
  }

  findWidgetById(widgetId: String) {
    return this.widgets.find(function (widget) {
      return widget._id === widgetId;
    });
  }

  updateWidget(widgetId: String, widget: Widget) {
    for ( const i in this.widgets ) {
      if ( this.widgets[i]._id === widgetId ) {
        switch (widget.widgetType) {
          case 'HEADER':
            this.widgets[i].text = widget.text;
            this.widgets[i].size = widget.size;
            return true;

          case 'IMAGE':
            this.widgets[i].text = widget.text;
            this.widgets[i].url = widget.url;
            this.widgets[i].width = widget.width;
            return true;

          case 'YOUTUBE':
            this.widgets[i].text = widget.text;
            this.widgets[i].url = widget.url;
            this.widgets[i].width = widget.width;
            return true;
        }

      }
    }
    return false;
  }

  deleteWidget(widgetId: String) {
    for (let i = 0; i < this.widgets.length; i++) {
      if (this.widgets[i]._id === widgetId) {
        this.widgets.splice(i, 1);
        i = this.widgets.length;
      }
    }
  }

}
