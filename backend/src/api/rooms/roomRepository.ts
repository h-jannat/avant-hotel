import db from "@/db";

export class RoomRepository {
  tableName: string = "rooms";

  async findAllAsync({
    offset,
    limit,
    sortBy,
    sortDirection,
  }: {
    offset: number;
    limit: number;
    sortBy: string | null | undefined;
    sortDirection: string | null | undefined;
  }): Promise<any> {
    return db
      .select(
        "id",
        "name",
        "number",
        db.raw(
          "COALESCE(total_upcoming_reservations, ?) as total_upcoming_reservations",
          [0]
        ),

        "created_at",
        "updated_at"
      )
      .from(this.tableName)
      .leftJoin(
        db
          .select("reservations_rooms.room_id")
          .count("reservations_rooms as total_upcoming_reservations")
          .from("reservations_rooms")
          .join(
            "reservations",
            "reservations_rooms.reservation_id",
            "reservations.id"
          )
          .where("reservations.start_date", ">", new Date())
          .groupBy("reservations_rooms.room_id")
          .as("upcoming_reservations"),
        "rooms.id",
        "upcoming_reservations.room_id"
      )
      .orderBy(sortBy ? sortBy : "number", sortDirection ?? "asc")
      .offset(offset)
      .limit(limit);
  }

  async findByIdAsync(id: string): Promise<any> {
    return db.select().from(this.tableName).where("id", id).first();
  }

  async createAsync(createData: any): Promise<any> {
    return db(this.tableName).insert(createData);
  }

  async updateAsync(id: string, updateData: any): Promise<any> {
    return db(this.tableName).update(updateData).where("id", id);
  }
}
