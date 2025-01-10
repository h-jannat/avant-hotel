import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { ContentTableComponent } from '../components/content-table/content-table.component';
import { PageHeaderComponent } from '../components/page-header/page-header.component';
import { GuestService } from '../services/guest.service';

@Component({
  selector: 'app-guests',
  imports: [ContentTableComponent, PageHeaderComponent, RouterOutlet],
  templateUrl: './guests.component.html',
  styleUrl: './guests.component.less',
})
export class GuestsComponent {
  tableHeads = ['Name', 'Email', 'Phone'];

  data = [];
  index = 0;
  size = 10;
  length = 0;
  totalItems = 0;
  protected openOrderByDropDown = false;
  protected openOrderDirectionDropDown = false;
  protected orderDirection = 'ASC';
  protected orderBy = 'name';

  constructor(
    private guestService: GuestService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  fetchGuests(index: number) {
    this.guestService
      .getGuests(index + 1, this.size)
      .subscribe((guests: any) => {
        const data = guests.data.map((guest: any) => {
          return {
            id: guest.id,
            name: guest.name,
            email: guest.email,
            phone: guest.phone,
          };
        });
        this.data = data;
        this.totalItems = parseInt(guests.total);
        this.length = Math.ceil(this.totalItems / this.size);
      });
  }

  goToPage(index: number) {
    this.index = index;
    this.fetchGuests(index);
  }

  ngOnInit() {
    this.fetchGuests(this.index);

    this.route.queryParams.subscribe((params) => {
      if (params['refresh']) {
        this.fetchGuests(this.index);
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { refresh: null },
        });
      }
    });
  }
}
