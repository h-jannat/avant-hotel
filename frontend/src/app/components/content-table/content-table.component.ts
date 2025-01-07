import { NgForOf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TuiTable } from '@taiga-ui/addon-table';
import { TuiContext, TuiStringHandler } from '@taiga-ui/cdk/types';
import { TuiButton, TuiFormatNumberPipe, TuiTextfield } from '@taiga-ui/core';
import {
  TuiButtonSelect,
  TuiDataListWrapper,
  TuiPagination,
} from '@taiga-ui/kit';

@Component({
  selector: 'app-content-table',
  imports: [
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
  templateUrl: './content-table.component.html',
  styleUrl: './content-table.component.less',
})
export class ContentTableComponent {
  @Input()
  tableHeads: string[] = [];
  @Input() data = [{}];
  @Input() index: number = 0;
  @Input() totalItems: number = 0;
  @Input() length: number = 0;
  @Input() size: number = 10;

  protected objectValues = Object.values;
  protected readonly content: TuiStringHandler<TuiContext<number>> = ({
    $implicit,
  }) => `${$implicit} items per page`;
}
