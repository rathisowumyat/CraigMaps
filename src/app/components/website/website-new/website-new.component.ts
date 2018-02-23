import {Component, OnInit, ViewChild} from '@angular/core';
import {Website} from '../../../models/website.model.client';
import {WebsiteService} from '../../../services/website.service.client';
import {ActivatedRoute, Route} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-website-new',
  templateUrl: './website-new.component.html',
  styleUrls: ['./website-new.component.css']
})
export class WebsiteNewComponent implements OnInit {
  name: String;
  userId: String;
  webId: String;
  desc: String;
  errorFlag: boolean;
  @ViewChild('f') webForm: NgForm;
  errorMsg = 'Invalid developer!';

  constructor(private webservice: WebsiteService,
              private route: ActivatedRoute) { }

  createWebsite() {
    this.webservice.createWebsite(this.userId,
      new Website('777',
        this.webForm.value.name,
        this.userId,
        this.webForm.value.desscription));
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['userId'];
      this.webId = params['webId'];
    });
  }

}
