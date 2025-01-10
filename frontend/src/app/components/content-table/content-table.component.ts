import { NgForOf, SlicePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
    SlicePipe,
  ],
  templateUrl: './content-table.component.html',
  styleUrl: './content-table.component.less',
})
export class ContentTableComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}

  @Input()
  tableHeads: string[] = [];
  @Input() data = [{}];
  @Input() index: number = 0;
  @Input() totalItems: number = 0;
  @Input() length: number = 0;
  @Input() size: number = 10;
  @Output() onPageChange = new EventEmitter<number>();

  protected objectValues = Object.values;
  protected readonly content: TuiStringHandler<TuiContext<number>> = ({
    $implicit,
  }) => `${$implicit} items per page`;

  goToPage(page: number) {
    this.onPageChange.emit(page);
  }

  navigateTo(item: any) {
    this.router.navigate([item.id, { item: JSON.stringify(item) }], {
      relativeTo: this.route,
    });
  }
}
