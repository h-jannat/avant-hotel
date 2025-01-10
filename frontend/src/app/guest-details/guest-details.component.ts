import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { PageHeaderComponent } from '../components/page-header/page-header.component';
import { GuestService } from '../services/guest.service';

@Component({
  selector: 'app-guest-details',
  imports: [NgIf, NgFor, DatePipe, PageHeaderComponent, RouterOutlet],
  templateUrl: './guest-details.component.html',
  styleUrls: ['./guest-details.component.less'],
})
export class GuestDetailsComponent {
  guest: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private guestService: GuestService
  ) {}

  ngOnInit() {
    let guestId = this.route.snapshot.paramMap.get('id');

    if (!guestId) {
      this.router.navigate(['../'], { relativeTo: this.route });
      return;
    }

    this.guestService.getGuestById(guestId).subscribe((guest) => {
      if (!guest) {
        this.router.navigate(['../'], { relativeTo: this.route });
        return;
      }

      this.guest = guest;
    });
  }
}
