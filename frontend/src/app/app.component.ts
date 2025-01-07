import { TuiRoot } from "@taiga-ui/core";
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarNavigatorComponent } from "./side-bar-navigator/side-bar-navigator.component";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-root',
  imports: [  CommonModule , RouterOutlet, TuiRoot, SidebarNavigatorComponent, TuiRoot],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent {
  title = 'hotel-reservation';




}
