import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-page-header',
  imports: [NgIf],
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.less',
})
export class PageHeaderComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}

  @Input() title: string = '';
  @Input() type: string = ''; // list, detail

  onCreateClick() {
    this.router.navigate(['create'], { relativeTo: this.route });
  }

  onEditClick() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }
}
