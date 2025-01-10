import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GuestService } from '../services/guest.service';

import { AsyncPipe, NgIf } from '@angular/common';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

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
  selector: 'app-create-guest',
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
  templateUrl: './create-guest.component.html',
  styleUrl: './create-guest.component.less',
})
export class CreateGuestComponent {
  constructor(private router: Router, private guestService: GuestService) {}

  create() {
    if (this.form.invalid) {
      return;
    }

    const { name, email, phone } = this.form.value;
    this.guestService.createGuest({ name, email, phone }).subscribe(() => {
      this.router.navigate(['/guests'], { queryParams: { refresh: true } });
    });
  }

  cancel() {
    this.router.navigate(['/guests']);
  }

  protected readonly form = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
  });
}
