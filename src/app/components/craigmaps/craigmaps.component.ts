import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {CraigmapsService} from '../../services/craigmaps.service.client';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {SharedService} from '../../services/shared.service';

@Component({
  selector: 'app-craigmaps',
  templateUrl: './craigmaps.component.html',
  styleUrls: ['./craigmaps.component.css']
})
export class CraigmapsComponent implements OnInit {

  from: string;
  to: string;
  errorFlag: boolean = false;
  errorMsg: string = '';
  baseUrl = environment.baseUrl;

  @ViewChild('f') searchForm: NgForm;

  constructor(private craigmapsservice: CraigmapsService,
              private router: Router,
              private sharedService: SharedService) { }

  search() {
    this.from = this.searchForm.value.from;
    this.to = this.searchForm.value.to;

    this.craigmapsservice.rental(this.from)
      .subscribe(
        (data: any) => {
          console.log(data);
          // let d = JSON.parse(data);
          // console.log(d);
          data.forEach((l) => {
            console.log(l.price);
          });
        },
        (error: any) => {
          this.errorMsg = 'Could not find any rentals';
          this.errorFlag = true;
        }
      );

    if (this.errorFlag) {
      return;
    }

    return this.craigmapsservice.search(this.from, this.to)
      .subscribe(
        (data: any) => {
          //console.log(data);
          const d = JSON.parse(data);
          console.log(d.routes[0].legs[0].distance.text);
          console.log(d.routes[0].legs[0].duration.text);
        },
        (error: any) => {
          this.errorMsg = 'Could not find any route';
          this.errorFlag = true;
        }
      );
    }

    ngOnInit() {
    }
}
