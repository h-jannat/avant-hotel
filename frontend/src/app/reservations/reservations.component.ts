import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { ContentTableComponent } from '../components/content-table/content-table.component';
import { PageHeaderComponent } from '../components/page-header/page-header.component';
import { ReservationService } from '../services/reservation.service';

@Component({
  selector: 'app-reservations',
  imports: [ContentTableComponent, PageHeaderComponent, RouterOutlet],
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.less'],
})
export class ReservationsComponent {
  tableHeads = ['Guest Name', 'Start Date', 'End Date', 'Room Numbers'];
  data = [];
  index = 0;
  size = 10;
  length = 0;
  totalItems = 0;
  protected openOrderByDropDown = false;
  protected openOrderDirectionDropDown = false;
  protected orderDirection = 'ASC';
  protected orderBy = 'start_date';

  constructor(
    private reservationService: ReservationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  fetchReservations(index: number) {
    this.reservationService
      .getReservations(index + 1, this.size)
      .subscribe((reservations: any) => {
        const data = reservations.data.map((reservation: any) => {
          const roomNumbers = reservation.rooms
            .filter((room: any) => room.number) // Ensure valid room numbers
            .map((room: any) => room.number)
            .join(', '); // Join room numbers with commas
          return {
            id: reservation.id,
            guestName: reservation.guest_name,
            startDate: reservation.start_date,
            endDate: reservation.end_date,
            roomNumbers: roomNumbers || 'No rooms assigned',
          };
        });
        this.data = data;
        this.totalItems = parseInt(reservations.total);
        this.length = Math.ceil(this.totalItems / this.size);
      });
  }

  goToPage(index: number) {
    this.index = index;
    this.fetchReservations(index);
  }

  ngOnInit() {
    this.fetchReservations(this.index);

    this.route.queryParams.subscribe((params) => {
      if (params['refresh']) {
        this.fetchReservations(this.index);
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { refresh: null },
        });
      }
    });
  }
}
