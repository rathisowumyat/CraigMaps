import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {CraigmapsService} from '../../services/craigmaps.service.client';
import {ActivatedRoute, Router} from '@angular/router';
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
  mode: string;
  rent: string;
  selected = 'DRIVING';
  errorFlag = false;
  errorMsg = '';
  baseUrl = environment.baseUrl;
  userId: string;
  user: any;
  rentals: any;
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

    this.craigmapsservice.rental(this.from, this.rent)
      .subscribe(
        (data: any) => {
          // console.log(data);
          this.rentals = JSON.stringify(data);
          // let d = JSON.parse(data);
          // console.log(d);
          // data.forEach((l) => {
          //   console.log(l.price);
          // });
          data.forEach((d) => {
            this.craigmapsservice.route(d, this.to, this.mode)
              .subscribe(
                (l: any) => {
                  console.log(l);
                  this.routedRentals.push({
                    location: l.location,
                    price: l.price,
                    duration: l.duration,
                    distance: l.distance,
                    durationval: l.durationval,
                    distanceval: l.distanceval,
                    url: l.url
                  });
                  this.routedRentals = this.routedRentals.sort((a, b) => {
                     // return parseFloat(a.durationval) - parseFloat(b.durationval);
                    return a.durationval - b.durationval;
                  });
                  var pra = parseInt(l.price.toString().replace('$', ''), 10);
                  var dura = l.durationval;
                  var dist = l.distanceval;
                  if (pra && dura && dist) {
                    this.myDataSets[0].points.push({
                      x: pra,
                      y: dura
                    });
                    this.myDataSets[1].points.push({
                      x: pra,
                      y: dist
                    });
                  }
                  console.log('Price: ' + l.price +
                    ',location: ' + l.location +
                    ',distance: ' + JSON.stringify(l.distance) +
                    ',duration: ' + JSON.stringify(l.duration));
                },
                (error: any) => {
                  this.errorMsg = 'No routes fetched! Check for address and Try again!';
                  this.errorFlag = true;
                  console.log(this.errorMsg);
                }
              );
          });
        },
        (error: any) => {
          this.errorMsg = 'No rentals currently availabel for this city! Check for city name/Adjust rent and try again!';
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

  monitorRental() {
      this.user = this.sharedService.user;
    if (this.user.admin) {
      this.router.navigate(['/profile', 'craigmaps', 'admin', 'rentals']);
    } else {
      this.errorMsg = 'Only Admins are allowed to Monitor';
      this.errorFlag = true;
      console.log(this.errorMsg);
    }
  }

  monitorTravell() {
    this.user = this.sharedService.user;
    if (this.user.admin) {
      this.router.navigate(['/profile', 'craigmaps', 'admin', 'travels']);
    } else {
      this.errorMsg = 'Only Admins are allowed to Monitor';
      this.errorFlag = true;
      console.log(this.errorMsg);
    }
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = this.sharedService.user['_id'];
      console.log(this.userId);
      console.log(this.user);
    });
  }
}
