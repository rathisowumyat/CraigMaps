import {Component, OnInit, ViewChild} from '@angular/core';
import {SharedService} from '../../services/shared.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CraigmapsService} from '../../services/craigmaps.service.client';
import {environment} from '../../../environments/environment';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.css']
})
export class MonitorComponent implements OnInit {
  baseUrl = environment.baseUrl;
  userId: string;
  user: any;

  constructor(private craigmapsservice: CraigmapsService,
              private route: ActivatedRoute,
              private router: Router,
              private sharedService: SharedService) { }


  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = this.sharedService.user['_id'];
    });
  }

}
