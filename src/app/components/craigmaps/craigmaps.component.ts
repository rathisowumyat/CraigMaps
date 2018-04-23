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
  rentals: any;
  routedRentals = [];
  chart = false;
  myDataSets = [{
    name: 'rentals  vs duration',
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
                  // console.log(data);
                  this.rentals.push({
                    location: l.location,
                    price: l.price,
                    duration: l.duration,
                    distance: l.distance,
                    url: l.url
                  });
                  this.routedRentals = this.rentals.sort((a,b) => {
                     return parseFloat(a.durationval) - parseFloat(b.durationval);
                  });
                  var pra = l.price.toString().replace('$', '');
                  var dura = l.durationval;
                  if (pra && dura) {
                    this.myDataSets[0].points.push({
                      x: parseFloat(pra),
                      y: parseFloat(l.durationval)
                    });
                  }
                  console.log('Price: ' + l.price +
                    ',location: ' + l.location +
                    ',distance: ' + JSON.stringify(l.distance) +
                    ',duration: ' + JSON.stringify(l.duration));
                },
                (error: any) => {
                  this.errorMsg = 'Could not find any route';
                  this.errorFlag = true;
                  console.log(this.errorMsg);
                }
              );
          });
        },
        (error: any) => {
          this.errorMsg = 'Could not find any rentals';
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
    this.rentals = [];
    this.routedRentals = [];
    this.chart = false;
    this.router.navigate(['/profile', 'craigmaps']);
  }

  ngOnInit() {
  }
}
