import { ReservationRepository } from "@/api/reservations/reservationRepository";
import { logger } from "@/app";
import { RoomRepository } from "../rooms/roomRepository";

export class ReservationService {
  private reservationRepository: ReservationRepository;
  private roomRepository: RoomRepository;

  constructor(
    repository: ReservationRepository = new ReservationRepository(),
    roomRepository: RoomRepository = new RoomRepository()
  ) {
    this.reservationRepository = repository;
    this.roomRepository = roomRepository;
  }

  // Retrieves all reservations
  async findAll({
    offset,
    limit,
    sortBy,
    sortDirection,
  }: {
    offset: number;
    limit: number;
    sortBy: string | null | undefined;
    sortDirection: string | null | undefined;
  }): Promise<any[] | null | any> {
    try {
      const reservations = await this.reservationRepository.findAllAsync({
        offset,
        limit,
        sortBy,
        sortDirection,
      });
      if (!reservations || reservations.length === 0) {
        return { message: "No reservations found" };
      }

      for (let reservation of reservations) {
        const rooms: any[] = [];
        for (let roomId of reservation.rooms) {
          const room = await this.roomRepository.findByIdAsync(roomId);
          rooms.push(room);
        }
        reservation.rooms = rooms;
      }

      const total = await this.reservationRepository.findTotal();

      return { data: reservations, total: total[0]["count"] };
    } catch (ex) {
      const errorMessage = `Error finding all reservations: ${
        (ex as Error).message
      }`;
      logger.error(errorMessage);
      return { message: errorMessage };
    }
  }

  // Retrieves a single reservation by ID
  async findById(id: string): Promise<any | null> {
    try {
      const reservation = await this.reservationRepository.findByIdAsync(id);
      if (!reservation) {
        return { message: `Reservation with id ${id} not found` };
      }
      return reservation;
    } catch (ex) {
      const errorMessage = `Error finding reservation with id ${id}: ${
        (ex as Error).message
      }`;
      logger.error(errorMessage);
      return { message: errorMessage };
    }
  }

  // Creates a new reservation
  async create(createData: any): Promise<any | null> {
    try {
      const reservation = await this.reservationRepository.createAsync(
        createData
      );

      return reservation;
    } catch (ex) {
      const errorMessage = `Error creating reservation: ${
        (ex as Error).message
      }`;
      logger.error(errorMessage);
      return { message: errorMessage };
    }
  }

  // Updates an existing reservation
  async update(id: string, updateData: any): Promise<any | null> {
    try {
      await this.reservationRepository.updateAsync(id, updateData);

      return { message: "Reservation is updated" };
    } catch (ex) {
      const errorMessage = `Error updating reservation with id ${id}: ${
        (ex as Error).message
      }`;
      logger.error(errorMessage);
      return { message: errorMessage };
    }
  }
}

export const reservationService = new ReservationService();
