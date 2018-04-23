import {Component, OnInit, ViewChild} from '@angular/core';
import {SharedService} from '../../../services/shared.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CraigmapsService} from '../../../services/craigmaps.service.client';
import {environment} from '../../../../environments/environment';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-travel',
  templateUrl: './travel.component.html',
  styleUrls: ['./travel.component.css']
})
export class TravelComponent implements OnInit {

  from: string;
  to: string;
  mode: string;
  rent: string;
  selected = 'DRIVING';
  errorFlag = false;
  errorMsg = '';
  baseUrl = environment.baseUrl;
  rentals : any;
  userId: string;
  user: any;
  routedRentals = [];
  chart = false;
  myDataSets = [
    {
      name: 'x:rent vs y:time(in seconds) to reach',
      points: [
        // {x: 10, y: 100},
        // {x: 20, y: 500}
      ]
    },
    {
      name: 'x:rent vs y:distance(in meters) to destination',
      points: [
        // {x: 10, y: 100},
        // {x: 20, y: 500}
      ]
    }];

  @ViewChild('f') searchForm: NgForm;

  constructor(private craigmapsservice: CraigmapsService,
              private route: ActivatedRoute,
              private router: Router,
              private sharedService: SharedService) { }

  search() {
    this.from = this.searchForm.value.from;
    this.to = this.searchForm.value.to;
    this.mode = this.searchForm.value.mode;
    this.rent = this.searchForm.value.rent;
    if (!this.mode || this.mode === '') {
      this.mode = 'driving';
    }
    this.chart = false;
    this.rentals = [];
    this.routedRentals = [];
    // console.log('ts:'+this.from+this.to+this.mode);

            this.craigmapsservice.route(this.from, this.to, this.mode)
              .subscribe(
                (l: any) => {
                  console.log(l);
                  this.routedRentals.push({
                    duration: l.duration,
                    distance: l.distance,
                    durationval: l.durationval,
                    distanceval: l.distanceval,
                  });
                  this.routedRentals = this.routedRentals.sort((a,b) => {
                    // return parseFloat(a.durationval) - parseFloat(b.durationval);
                    return a.durationval - b.durationval;
                  });
                  var dura = l.durationval;
                  var dist = l.distanceval;

                   console.log(
                    ',distance: ' + JSON.stringify(l.distance) +
                    ',duration: ' + JSON.stringify(l.duration));
                },
                (error: any) => {
                  this.errorMsg = 'No routes fetched! Check for address and Try again!';
                  this.errorFlag = true;
                  console.log(this.errorMsg);
                }
              );
    this.chart = true;

    // console.log('************:'+this.rentals);
    // this.rentals.forEach((l) => {
    //   console.log(l.price);
    // });

  }

  clear() {
    this.from = '';
    this.to = '';
    this.mode = 'driving';
    this.rent = '1000';
    this.errorFlag = false;
    this.errorMsg = '';
    this.baseUrl = environment.baseUrl;
    this.rentals = '';
    this.routedRentals = [];
    this.chart = false;
    this.router.navigate(['/profile', 'craigmaps']);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = this.sharedService.user['_id'];
    });
  }
}

