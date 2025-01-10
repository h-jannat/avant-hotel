import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { PageHeaderComponent } from '../components/page-header/page-header.component';
import { RoomService } from '../services/room.service';

@Component({
  selector: 'app-room-details',
  imports: [NgIf, NgFor, DatePipe, PageHeaderComponent, RouterOutlet],
  templateUrl: './room-details.component.html',
  styleUrl: './room-details.component.less',
})
export class RoomDetailsComponent {
  room: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private roomService: RoomService
  ) {}

  ngOnInit() {
    console.log(this.route.toString());

    let roomId = this.route.snapshot.paramMap.get('id');

    if (!roomId) {
      this.router.navigate(['../'], { relativeTo: this.route });
      return;
    }

    this.roomService.getRoomById(roomId).subscribe((room) => {
      if (!room) {
        this.router.navigate(['../'], { relativeTo: this.route });
        return;
      }

      this.room = room;
    });
  }
}
