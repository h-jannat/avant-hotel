import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { TuiActiveZone } from '@taiga-ui/cdk/directives/active-zone';
import { TuiObscured } from '@taiga-ui/cdk/directives/obscured';
import { TuiButton, TuiDropdown } from '@taiga-ui/core';
import { TuiChevron } from '@taiga-ui/kit';
import { ContentTableComponent } from '../components/content-table/content-table.component';
import { PageHeaderComponent } from '../components/page-header/page-header.component';
import { RoomService } from '../services/room.service';

@Component({
  selector: 'app-rooms',
  imports: [
    CommonModule,
    TuiActiveZone,
    TuiButton,
    TuiChevron,
    TuiDropdown,
    TuiObscured,
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
  protected openOrderByDropDown = false;
  protected openOrderDirectionDropDown = false;
  protected orderDirection = 'ASC';
  protected orderBy = 'name';

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

  //Order by dropdown

  protected onClickOrderByDropDown(): void {
    this.openOrderByDropDown = !this.openOrderByDropDown;
  }

  protected onObscuredOrderByDropDown(obscured: boolean): void {
    if (obscured) {
      this.openOrderByDropDown = false;
    }
  }

  protected onActiveZoneOrderByDropDown(active: boolean): void {
    this.openOrderByDropDown = active && this.openOrderByDropDown;
  }

  protected onOrderByDropDownItemClick(label: string) {
    this.orderBy = label;
    this.fetchRooms(this.index, label, this.orderDirection);
  }

  //Order Direction Dropdown
  protected onClickOrderDirectionDropDown(): void {
    this.openOrderDirectionDropDown = !this.openOrderDirectionDropDown;
  }

  protected onObscuredOrderDirectionDropDown(obscured: boolean): void {
    if (obscured) {
      this.openOrderDirectionDropDown = false;
    }
  }

  protected onActiveZoneOrderDirectionDropDown(active: boolean): void {
    this.openOrderDirectionDropDown = active && this.openOrderDirectionDropDown;
  }

  protected onOrderDirectionDropDownItemClick(direction: string) {
    this.orderDirection = direction;
    this.fetchRooms(this.index, this.orderBy, direction);
  }
}
