import { AsyncPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  TuiAppearance,
  TuiButton,
  TuiError,
  TuiIcon,
  TuiNotification,
  TuiTextfield,
  TuiTitle,
} from '@taiga-ui/core';
import {
  TuiFieldErrorPipe,
  TuiSegmented,
  TuiSwitch,
  TuiTooltip,
} from '@taiga-ui/kit';
import { TuiCardLarge, TuiForm, TuiHeader } from '@taiga-ui/layout';

@Component({
  selector: 'app-edit-room',
  imports: [
    AsyncPipe,
    NgIf,
    ReactiveFormsModule,
    TuiAppearance,
    TuiButton,
    TuiCardLarge,
    TuiError,
    TuiFieldErrorPipe,
    TuiForm,
    TuiHeader,
    TuiIcon,
    TuiNotification,
    TuiSegmented,
    TuiSwitch,
    TuiTextfield,
    TuiTitle,
    TuiTooltip,
  ],
  templateUrl: './edit-room.component.html',
  styleUrl: './edit-room.component.less',
})
export class EditRoomComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) // private roomService: RoomService
  {}

  update() {
    throw new Error('Method not implemented.');
  }

  cancel() {
    this.router.navigate(['/rooms']);
  }

  protected readonly form = new FormGroup({
    name: new FormControl('', Validators.required),
    number: new FormControl('', Validators.required),
  });

  ngOnInit() {
    console.log(this.route.toString());
    // let roomId = this.route.snapshot.paramMap.get('id');
    // console.log(roomId);

    // if (!roomId) {
    //   this.router.navigate(['../../'], { relativeTo: this.route });
    //   return;
    // }

    // this.roomService.getRoomById(roomId).subscribe((room) => {
    //   if (!room) {
    //     this.router.navigate(['../../'], { relativeTo: this.route });
    //     return;
    //   }

    //   this.form.patchValue({
    //     name: (room as any).name,
    //     number: (room as any).number,
    //   });
    // });
  }
}
