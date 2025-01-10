import Room from './room.dto';

export default class Reservation {
  id: string;
  guestId: string;
  startDate: Date;
  endDate: Date;
  rooms: Room[];

  // Constructor to initialize the properties
  constructor(
    id: string,
    guestId: string,
    startDate: Date,
    endDate: Date,
    rooms: Room[]
  ) {
    this.id = id;
    this.guestId = guestId;
    this.startDate = startDate;
    this.endDate = endDate;
    this.rooms = rooms;
  }
}
