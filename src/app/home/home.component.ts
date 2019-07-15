import {Component, OnInit, ViewChild} from '@angular/core';
import {BookingsService} from '../services/bookins/bookings.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  displayColumns: string[] = ['bookingId', 'firsname', 'lastname', 'date', 'address', 'price'];
  dataSource = new MatTableDataSource;

  form: FormGroup;
  firstSearch: boolean = true;
  bookings: Array<any> = [];
  searchTerm: string = '';
  currentDetail: any;
  mobile = false;
  window = window.screen.width;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private booking: BookingsService,
              private router: Router) {
    this.form = new FormGroup({
      email: new FormControl('', Validators.required),

    });

  }


  ngOnInit() {
    this.searchBookings();
    window.onresize = () => this.mobile = window.innerWidth > 768;
  }

  searchBookings() {
    const current = true;
    this.booking.getBookings(this.form.value.email, current)
      .subscribe((response: Array<any>) => {
        this.firstSearch = false;
        this.bookings = response;
      }, err => {
        console.log(err);
      });
  }

  setFilteredItems() {
    this.bookings = this.booking.filterBookings(this.searchTerm);
  }


  priceFilter(minPrice:number, maxPrice:number) {
    this.bookings = this.bookings.filter(elementFil => {
      return elementFil.bookingPrice >= minPrice && elementFil.bookingPrice <= maxPrice
    });
  }

  logout() {
    localStorage.removeItem("KEY_CREDENTIALS");
    this.router.navigate(['/login'])
  }

}
