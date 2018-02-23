import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {User} from '../../../models/user.model.client';
import {WebsiteService} from '../../../services/website.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {Website} from '../../../models/website.model.client';

@Component({
  selector: 'app-website-edit',
  templateUrl: './website-edit.component.html',
  styleUrls: ['./website-edit.component.css']
})
export class WebsiteEditComponent implements OnInit {
  name: String;
  userId: String;
  webId: String;
  desc: String;
  errorFlag: boolean;
  @ViewChild('f') webForm: NgForm;
  errorMsg = 'Invalid developer!';

  constructor(private webservice: WebsiteService,
              private route: ActivatedRoute) {  }

  updateWebsite() {
    this.webservice.updateWebsite(this.webId,
      new Website(this.webId,
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
