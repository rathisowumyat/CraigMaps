import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';
import {environment} from '../../environments/environment';

@Injectable()
export  class WidgetService {

  widgets: any[] = [];
  constructor(private http: Http){}
  baseUrl = environment.baseUrl;

  findAllWidgets() {
    return this.widgets;
  }

  updateWidget(pageId: String, newWidget: any) {
    const url =  this.baseUrl + '/api/widget/' + newWidget._id;
    return this.http.put(url, newWidget).map((response: Response) => {
      return response.json();
    });
  }

  findImage(imageName: String) {
    const url = this.baseUrl + '/api/image/' + imageName;
    return this.http.get(url).map(
      (res: Response) => {
        return res.json();
      }
    );
  }

  findWidgetById(widgetId: String) {
    const url =  this.baseUrl + '/api/widget/' + widgetId;
    return this.http.get(url).map((response: Response) => {
      return response.json();
    });
  }

  deleteWidget(pageId: String, widgetId: String) {
    const url =  this.baseUrl + '/api/widget/' + widgetId;
    return this.http.delete(url).map((response: Response) => {
      return response.json();
    });
  }

  createWidget(pageId: String, newWidget: any) {
    const url = this.baseUrl + '/api/page/' + pageId + '/widget';
    return this.http.post(url, newWidget).map((response: Response) => {
      return response.json();
    });
  }


  findWidgetsByPageId(pageId: String) {
    const url = this.baseUrl + '/api/page/' + pageId + '/widget';
    return this.http.get(url).map((response: Response) => {
      return response.json();
    });
  }

   reorderWidgets(pageId : String, widget : any, initial : number, final : number) {
    const body = {widget: widget};
    return this.http.put(this.baseUrl + '/api/page/'+ pageId + "/widget?initial=" + initial + "&final=" + final, body)
      .map((response: Response) => {
          return response.json();
        }
      );
  }

}
