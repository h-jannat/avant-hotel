import { CommonModule, NgForOf } from '@angular/common';
import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  TuiAppearance,
  TuiButton,
  TuiDataList,
  TuiDropdown,
  TuiTextfield,
} from '@taiga-ui/core';
import { TuiChevron, TuiFade, TuiTabs } from '@taiga-ui/kit';
import { TuiNavigation } from '@taiga-ui/layout';
import {
  createPath,
  guestsPath,
  reservationsPath,
  roomsPath,
} from '../../app.routes';

@Component({
  selector: 'sidebar-navigator',
  templateUrl: './side-bar-navigator.component.html',
  styleUrls: ['./side-bar-navigator.component.less'],
  imports: [
    CommonModule,
    FormsModule,
    NgForOf,
    RouterLink,
    RouterLinkActive,
    TuiAppearance,
    TuiButton,
    TuiChevron,
    TuiDataList,
    TuiDropdown,
    TuiFade,
    TuiNavigation,
    TuiTabs,
    TuiTextfield,
  ], // Create a CSS file
})
export class SidebarNavigatorComponent {
  protected expanded = false;
  protected open = false;
  protected switch = false;

  protected createItemPath: string = createPath;
  drawer = [
    {
      icon: 'users-round',
      label: 'Guest',
      path: guestsPath,
    },
    {
      icon: 'door-closed',
      label: 'Room',
      path: roomsPath,
    },
    {
      icon: 'calendar-check-2',
      label: 'Reservation',
      path: reservationsPath,
    },
  ];
}
