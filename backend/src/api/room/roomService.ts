import { RoomRepository } from "@/api/room/roomRepository";
import { logger } from "@/app";

export class UserService {
  private roomRepository: RoomRepository;

  constructor(repository: RoomRepository = new RoomRepository()) {
    this.roomRepository = repository;
  }

  // Retrieves all users from the database
  async findAll(): Promise<any[] | null> {
    try {
      const users = await this.roomRepository.findAllAsync();
      if (!users || users.length === 0) {
        return null;
      }
      return users;
    } catch (ex) {
      const errorMessage = `Error finding all users: $${(ex as Error).message}`;
      logger.error(errorMessage);
      return null;
    }
  }

  // Retrieves a single user by their ID
  async findById(id: number): Promise<any | null> {
    try {
      const user = await this.roomRepository.findByIdAsync(id);
      if (!user) {
        return null;
      }
      return user;
    } catch (ex) {
      const errorMessage = `Error finding user with id ${id}:, ${
        (ex as Error).message
      }`;
      logger.error(errorMessage);
      return null;
    }
  }
}

export const roomService = new UserService();
