import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { PageHeaderComponent } from '../components/page-header/page-header.component';

@Component({
  selector: 'app-reservation-details',
  imports: [NgIf, NgFor, DatePipe, PageHeaderComponent, RouterOutlet],
  templateUrl: './reservation-details.component.html',
  styleUrls: ['./reservation-details.component.less'],
})
export class ReservationDetailsComponent {
  reservation: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute // private reservationService: ReservationService
  ) {}

  ngOnInit() {
    this.reservation = JSON.parse(
      this.route.snapshot.paramMap.get('item') ?? ''
    );
    console.log(this.reservation);

    const reservationId = this.route.snapshot.paramMap.get('id');

    if (!reservationId) {
      this.router.navigate(['../'], { relativeTo: this.route });
      return;
    }

    // this.reservationService
    //   .getReservationById(reservationId)
    //   .subscribe((reservation) => {
    //     if (!reservation) {
    //       this.router.navigate(['../'], { relativeTo: this.route });
    //       return;
    //     }

    //     this.reservation = reservation;
    //   });
  }
}
