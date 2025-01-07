import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-header',
  imports: [],
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.less',
})
export class PageHeaderComponent {
  @Input() title: string = '';
}
