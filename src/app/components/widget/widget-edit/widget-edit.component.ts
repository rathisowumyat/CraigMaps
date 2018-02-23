import {Component, OnInit, ViewChild} from '@angular/core';
import {WidgetService} from '../../../services/widget.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {Widget} from '../../../models/widget.model.client';

@Component({
  selector: 'app-widget-edit',
  templateUrl: './widget-edit.component.html',
  styleUrls: ['./widget-edit.component.css']
})
export class WidgetEditComponent implements OnInit {

  pageId: String;
  userId: String;
  webId: String;
  wdgId: String;

  @ViewChild('f') wdgForm: NgForm;

  constructor(private wdgservice: WidgetService,
              private route: ActivatedRoute) { }

  createWidget() {
    this.wdgservice.createWidget(this.pageId,
                                  new Widget('555',
                                    this.wdgForm.value.type,
                                    this.wdgForm.value.text));
  }

  updateWidget() {
    this.wdgservice.updateWidget(this.wdgId,
      new Widget('555',
        this.wdgForm.value.type,
        this.wdgForm.value.text));
  }

  deleteWidget() {
    this.wdgservice.deleteWidget(this.wdgId);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['userId'];
      this.webId = params['webId'];
      this.wdgId = params['wdgId'];
      this.pageId = params['pageId'];
    });
  }

}
