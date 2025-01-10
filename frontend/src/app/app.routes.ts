import { Routes } from '@angular/router';
import { CreateGuestComponent } from './create-guest/create-guest.component';
import { CreateReservationComponent } from './create-reservation/create-reservation.component';
import { CreateRoomComponent } from './create-room/create-room.component';
import { EditGuestComponent } from './edit-guest/edit-guest.component';
import { EditReservationComponent } from './edit-reservation/edit-reservation.component';
import { EditRoomComponent } from './edit-room/edit-room.component';
import { GuestDetailsComponent } from './guest-details/guest-details.component';
import { GuestsComponent } from './guests/guests.component';
import { ReservationDetailsComponent } from './reservation-details/reservation-details.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { RoomDetailsComponent } from './room-details/room-details.component';
import { RoomsComponent } from './rooms/rooms.component';

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
    children: [{ path: createPath, component: CreateRoomComponent }],
  },
  {
    path: `${roomsPath}/${detailsPath}`,
    component: RoomDetailsComponent,
    children: [{ path: editPath, component: EditRoomComponent }],
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
