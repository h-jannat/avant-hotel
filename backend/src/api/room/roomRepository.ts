import db from "@/db";

export class RoomRepository {
  async findAllAsync(): Promise<any> {
    return db.select().from("users");
  }

  async findByIdAsync(id: number): Promise<any> {
    return db.select().from("users").where("id", id).first();
  }
}
