import {Component, OnInit, ViewChild} from '@angular/core';
import {SharedService} from '../../../services/shared.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CraigmapsService} from '../../../services/craigmaps.service.client';
import {environment} from '../../../../environments/environment';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {

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
  isAdmin = true;
  routedRentals = [];
  chart = false;
  myDataSets = [
    {
      name: 'plotting available rents',
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
          for (let count = 0; count < data.length; count++) {
            let l = data[count];
            const pra = parseInt(l.price.toString().replace('$', ''), 10);
            this.routedRentals.push({
              location: l.location,
              price: l.price,
              url: l.url,
              priceval: pra
            });
            this.routedRentals = this.routedRentals.sort((a, b) => {
              // return parseFloat(a.durationval) - parseFloat(b.durationval);
              return a.priceval - b.priceval;
            });

            if (pra) {
              this.myDataSets[0].points.push({
                x: pra,
                y: count
              });
            }
            console.log('Price: ' + l.price + ',location: ' + l.location + 'record:' + count);
          }
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

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = this.sharedService.user['_id'];
      this.user = this.sharedService.user;
      if (this.user.admin === true) {
        this.isAdmin = true;
      }
      console.log(this.userId);
      console.log(this.user);
    });
  }
}
