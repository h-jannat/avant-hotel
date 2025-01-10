import { RoomRepository } from "@/api/rooms/roomRepository";
import { logger } from "@/app";

export class UserService {
  private roomRepository: RoomRepository;

  constructor(repository: RoomRepository = new RoomRepository()) {
    this.roomRepository = repository;
  }

  // Retrieves all users from the database
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
      const rooms = await this.roomRepository.findAllAsync({
        offset,
        limit,
        sortBy,
        sortDirection,
      });
      const total = await this.roomRepository.findTotal();
      if (!rooms || rooms.length === 0) {
        return { message: "No rooms found" };
      }
      return { data: rooms, total: total[0]["count"] };
    } catch (ex) {
      const errorMessage = `Error finding all rooms: $${(ex as Error).message}`;
      logger.error(errorMessage);
      return { message: errorMessage };
    }
  }

  // Retrieves a single user by their ID
  async findById(id: string): Promise<any | null> {
    try {
      const room = await this.roomRepository.findByIdAsync(id);
      if (!room) {
        return { message: `Room with id ${id} not found` };
      }
      return room;
    } catch (ex) {
      const errorMessage = `Error finding room with id ${id}:, ${
        (ex as Error).message
      }`;
      logger.error(errorMessage);
      return { message: errorMessage };
    }
  }

  async create(createRoomData: any): Promise<any | null> {
    try {
      const room = await this.roomRepository.createAsync(createRoomData);

      return room;
    } catch (ex) {
      const errorMessage = `Error creating room ${ex}`;
      logger.error(errorMessage);
      return { message: errorMessage };
    }
  }

  async update(id: string, updateData: any): Promise<any | null> {
    try {
      await this.roomRepository.updateAsync(id, updateData);

      return { message: "room is updated" };
    } catch (ex) {
      const errorMessage = `Error update room with id ${id}:, ${
        (ex as Error).message
      }`;
      logger.error(errorMessage);
      return { message: errorMessage };
    }
  }
}

export const roomService = new UserService();
