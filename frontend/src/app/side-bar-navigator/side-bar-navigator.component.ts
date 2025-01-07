import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TuiIcon, TuiIconPipe } from '@taiga-ui/core';


interface MenuItem {
  label: string;
  icon: string;
  children?: MenuItem[];
  isOpen?: boolean; // Add isOpen property
}

@Component({
  selector: 'sidebar-navigator',
  templateUrl: './side-bar-navigator.component.html',
  styleUrls: ['./side-bar-navigator.component.less'],
  imports:[CommonModule, TuiIcon, TuiIconPipe] // Create a CSS file
})
export class SidebarNavigatorComponent {
  @Input() isSidebarCollapsed = false;
  @Output() sidebarToggle = new EventEmitter<void>();

  menuItems: MenuItem[] = [
    {
      icon: 'home',
      label: 'Home',


    },
    {
      icon: 'users-round',
      label: 'Settings',

    },
    {
      icon: 'calendar-check-2',
      label: 'Reservations'
    }
  ];

  toggleSidebar() {
    this.sidebarToggle.emit();
  }

  toggleMenuItem(item: MenuItem) {
    // Only toggle if sidebar is not collapsed and item has children
    if (!this.isSidebarCollapsed && item.children) {
      item.isOpen = !item.isOpen;
    }
  }
}
