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
          "COALESCE(total_upcoming_reservations, 0) as total_upcoming_reservations"
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

  async findTotal(): Promise<any> {
    return db(this.tableName).count();
  }

  async findByIdAsync(
    id: string,
    joinReservations: boolean = true
  ): Promise<any> {
    const room = await db.select().from(this.tableName).where("id", id).first();

    if (!room) {
      return { message: `Room with id ${id} not found` };
    }
    let result = {
      ...room,
    };
    if (joinReservations) {
      //current reservations
      const currentReservation = await db("reservations_rooms")
        .join(
          "reservations",
          "reservations_rooms.reservation_id",
          "reservations.id"
        )
        .join("guests", "reservations.guest_id", "guests.id")
        .select(
          "reservations.id as reservation_id",
          "reservations.start_date",
          "reservations.end_date",
          "guests.name as guest_name"
        )
        .where("reservations_rooms.room_id", id)
        .andWhere("reservations.start_date", "<=", new Date())
        .andWhere("reservations.end_date", ">=", new Date())
        .first();

      //upcoming reservations
      const upcomingReservations = await db("reservations_rooms")
        .join(
          "reservations",
          "reservations_rooms.reservation_id",
          "reservations.id"
        )
        .join("guests", "reservations.guest_id", "guests.id")
        .select(
          "reservations.id as reservation_id",
          "reservations.start_date",
          "reservations.end_date",
          "guests.name as guest_name"
        )
        .where("reservations_rooms.room_id", id)
        .andWhere("reservations.start_date", ">", new Date())
        .orderBy("reservations.start_date", "asc");

      result = {
        ...result,
        current_reservation: currentReservation,
        upcoming_reservations: upcomingReservations,
      };
    }
    return result;
  }

  async createAsync(createData: any): Promise<any> {
    return db(this.tableName).insert(createData);
  }

  async updateAsync(id: string, updateData: any): Promise<any> {
    return db(this.tableName).update(updateData).where("id", id);
  }
}
