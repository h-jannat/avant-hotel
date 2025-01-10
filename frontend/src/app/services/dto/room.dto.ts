export default class Room {
  id: string;
  name: string;
  number: number;
  totalUpcomingReservations?: number;

  constructor(
    id: string,
    name: string,
    number: number,
    totalUpcomingReservations?: number
  ) {
    this.id = id;
    this.name = name;
    this.number = number;
    this.totalUpcomingReservations = totalUpcomingReservations;
  }
}
