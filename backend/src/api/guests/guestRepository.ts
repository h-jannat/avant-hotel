import db from "@/db";

export class GuestRepository {
  tableName: string = "guests"; // Updated to "guests"

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
      .select()
      .from(this.tableName)
      .orderBy(sortBy ? sortBy : "name", sortDirection ?? "asc")
      .offset(offset)
      .limit(limit);
  }

  async findTotal(): Promise<any> {
    return db(this.tableName).count();
  }

  async findByIdAsync(id: string): Promise<any> {
    return db
      .select()
      .from(this.tableName)
      .where("id", id)
      .first()
      .leftJoin(
        db
          .select("reservations_guests.guest_id")
          .count("reservations_guests as total_reservations")
          .from("reservations_guests")
          .join(
            "reservations",
            "reservations_guests.reservation_id",
            "reservations.id"
          )
          .groupBy("reservations_guests.guest_id")
          .as("guest_reservations"),
        "guests.id",
        "guest_reservations.guest_id"
      );
  }

  async createAsync(createData: any): Promise<any> {
    return db(this.tableName).insert(createData);
  }

  async updateAsync(id: string, updateData: any): Promise<any> {
    return db(this.tableName).update(updateData).where("id", id);
  }
}
