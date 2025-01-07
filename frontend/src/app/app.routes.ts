import { Routes } from '@angular/router';
import { RoomsComponent } from './rooms/rooms.component';
import { GuestsComponent } from './guests/guests.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { CreateRoomComponent } from './create-room/create-room.component';
import { CreateGuestComponent } from './create-guest/create-guest.component';
import { CreateReservationComponent } from './create-reservation/create-reservation.component';
import { EditRoomComponent } from './edit-room/edit-room.component';
import { EditGuestComponent } from './edit-guest/edit-guest.component';
import { EditReservationComponent } from './edit-reservation/edit-reservation.component';
import { RoomDetailsComponent } from './room-details/room-details.component';
import { GuestDetailsComponent } from './guest-details/guest-details.component';
import { ReservationDetailsComponent } from './reservation-details/reservation-details.component';

export const roomsPath: string = 'rooms';
export const guestsPath: string = 'guests';
export const reservationsPath: string = 'reservations';

export const createPath: string = 'create';
export const detailsPath: string = ':id';
export const editPath: string = 'edit';

export const routes: Routes = [
  {
    path: roomsPath,
    component: RoomsComponent,
    children: [
      { path: createPath, component: CreateRoomComponent },
      {
        path: detailsPath,
        component: RoomDetailsComponent,
        children: [{ path: editPath, component: EditRoomComponent }],
      },
    ],
  },
  {
    path: guestsPath,
    component: GuestsComponent,
    children: [
      { path: createPath, component: CreateGuestComponent },
      {
        path: detailsPath,
        component: GuestDetailsComponent,
        children: [{ path: editPath, component: EditGuestComponent }],
      },
    ],
  },
  {
    path: reservationsPath,
    component: ReservationsComponent,
    children: [
      { path: createPath, component: CreateReservationComponent },
      {
        path: detailsPath,
        component: ReservationDetailsComponent,
        children: [{ path: editPath, component: EditReservationComponent }],
      },
    ],
  },
];
