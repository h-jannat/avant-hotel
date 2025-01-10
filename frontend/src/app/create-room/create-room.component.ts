import { AsyncPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
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
import { RoomService } from '../services/room.service';

@Component({
  selector: 'app-create-room',
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
  templateUrl: './create-room.component.html',
  styleUrl: './create-room.component.less',
})
export class CreateRoomComponent {
  constructor(private router: Router, private roomService: RoomService) {}

  create() {
    if (this.form.invalid) {
      return;
    }

    const { name, number } = this.form.value;
    this.roomService.createRoom({ name, number }).subscribe(() => {
      this.router.navigate(['/rooms'], { queryParams: { refresh: true } });
    });
  }

  cancel() {
    this.router.navigate(['/rooms']);
  }

  protected readonly form = new FormGroup({
    name: new FormControl('', Validators.required),
    number: new FormControl('', Validators.required),
  });
}
