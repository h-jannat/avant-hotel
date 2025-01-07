import { Component } from '@angular/core';
import { ContentTableComponent } from '../components/content-table/content-table.component';
import { PageHeaderComponent } from '../components/page-header/page-header.component';

@Component({
  selector: 'app-reservations',
  imports: [ContentTableComponent, PageHeaderComponent],
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.less',
})
export class ReservationsComponent {
  tableHeads = ['Name', 'Number'];
  protected data: { name: string; balance: number }[] = [
    {
      name: 'Alex Inkin',
      balance: 1323525,
    },
    {
      name: 'Roman Sedov',
      balance: 423242,
    },
  ] as const;

  index = 4;
  length = 10;
  size = 10;
  items = [10, 50, 100];
  totalItems = 999;
}
