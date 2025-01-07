import { AsyncPipe, NgForOf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TuiTable } from '@taiga-ui/addon-table';
import { TuiContext, TuiStringHandler } from '@taiga-ui/cdk/types';
import { TuiButton, TuiFormatNumberPipe, TuiTextfield } from '@taiga-ui/core';
import {
  TuiButtonSelect,
  TuiDataListWrapper,
  TuiPagination,
} from '@taiga-ui/kit';
import { ContentTableComponent } from '../components/content-table/content-table.component';

@Component({
  selector: 'app-rooms',
  imports: [
    AsyncPipe,
    FormsModule,
    NgForOf,
    TuiButton,
    TuiButtonSelect,
    TuiDataListWrapper,
    TuiFormatNumberPipe,
    TuiPagination,
    TuiTable,
    TuiTextfield,
    ContentTableComponent,
  ],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.less',
})
export class RoomsComponent {
  protected objectValues = Object.values;
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
  content: TuiStringHandler<TuiContext<number>> = ({ $implicit }) =>
    `${$implicit} items per page`;
}
