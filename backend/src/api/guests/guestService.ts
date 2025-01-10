import { GuestRepository } from "@/api/guests/guestRepository";
import { logger } from "@/app";

export class GuestService {
  private guestRepository: GuestRepository;

  constructor(repository: GuestRepository = new GuestRepository()) {
    this.guestRepository = repository;
  }

  // Retrieves all guests from the database
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
      const guests = await this.guestRepository.findAllAsync({
        offset,
        limit,
        sortBy,
        sortDirection,
      });
      if (!guests || guests.length === 0) {
        return { message: "No guests found" };
      }

      const total = await this.guestRepository.findTotal();
      return { data: guests, total: total[0]["count"] };
    } catch (ex) {
      const errorMessage = `Error finding all guests: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return { message: errorMessage };
    }
  }

  // Retrieves a single guest by their ID
  async findById(id: string): Promise<any | null> {
    try {
      const guest = await this.guestRepository.findByIdAsync(id);
      if (!guest) {
        return { message: `Guest with id ${id} not found` };
      }
      return guest;
    } catch (ex) {
      const errorMessage = `Error finding guest with id ${id}: ${
        (ex as Error).message
      }`;
      logger.error(errorMessage);
      return { message: errorMessage };
    }
  }

  // Creates a new guest
  async create(createGuestData: any): Promise<any | null> {
    try {
      const guest = await this.guestRepository.createAsync(createGuestData);

      return guest;
    } catch (ex) {
      const errorMessage = `Error creating guest: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return { message: errorMessage };
    }
  }

  // Updates an existing guest
  async update(id: string, updateData: any): Promise<any | null> {
    try {
      await this.guestRepository.updateAsync(id, updateData);

      return { message: "Guest is updated" };
    } catch (ex) {
      const errorMessage = `Error updating guest with id ${id}: ${
        (ex as Error).message
      }`;
      logger.error(errorMessage);
      return { message: errorMessage };
    }
  }
}

export const guestService = new GuestService();
