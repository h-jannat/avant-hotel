export default class CreateReservationDto {
  guestId: string;
  startDate: string;
  endDate: string;
  roomIds: string[];

  constructor(
    guestId: string,
    startDate: string,
    endDate: string,
    roomIds: string[]
  ) {
    this.guestId = guestId;
    this.startDate = startDate;
    this.endDate = endDate;
    this.roomIds = roomIds;
  }

  isValid() {
    if (!this.guestId || !this.startDate || !this.endDate || !this.roomIds) {
      return false;
    }

    return true;
  }
}
