import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { ContentTableComponent } from '../components/content-table/content-table.component';
import { PageHeaderComponent } from '../components/page-header/page-header.component';
import { RoomService } from '../services/room.service';

@Component({
  selector: 'app-rooms',
  imports: [
    ContentTableComponent,
    PageHeaderComponent,
    HttpClientModule,
    RouterOutlet,
  ],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.less',
})
export class RoomsComponent {
  tableHeads = ['Name', 'Number', 'Upcoming Reservations'];

  data = [];
  index = 0;
  size = 10;
  length = 0;
  totalItems = 0;

  constructor(
    private roomService: RoomService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  fetchRooms(index: number, sortBy: string, sortDirection: string) {
    this.roomService
      .getRooms(index + 1, this.size, sortBy, sortDirection)
      .subscribe((rooms: any) => {
        const data = rooms.data.map((room: any) => {
          return {
            id: room.id,
            name: room.name,
            number: room.number,
            total_upcoming_reservations: room.total_upcoming_reservations,
          };
        });
        this.data = data;
        this.totalItems = parseInt(rooms.total);
        this.length = Math.ceil(this.totalItems / this.size);
      });
  }

  goToPage(index: number) {
    this.index = index;
    this.fetchRooms(index, 'name', 'asc');
  }

  ngOnInit() {
    this.fetchRooms(this.index, 'name', 'asc');

    this.route.queryParams.subscribe((params) => {
      if (params['refresh']) {
        this.fetchRooms(this.index, 'name', 'asc');
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { refresh: null },
        });
      }
    });
  }
}
