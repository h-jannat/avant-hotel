export default class EditReservationDto {
  guestId?: string;
  startDate?: string;
  endDate?: string;
  roomIds?: string[];

  // Constructor to initialize the properties (optional)
  constructor(
    guestId?: string,
    startDate?: string,
    endDate?: string,
    roomIds?: string[]
  ) {
    this.guestId = guestId;
    this.startDate = startDate;
    this.endDate = endDate;
    this.roomIds = roomIds;
  }

  isValid() {
    if (
      !this.guestId &&
      !this.startDate &&
      !this.endDate &&
      (!this.roomIds || this.roomIds.length === 0)
    ) {
      return false;
    }

    return true;
  }
}
