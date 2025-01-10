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
      .select(
        "guests.*",
        db.raw("COALESCE(total_reservations, 0) as total_past_reservations")
      )
      .from(this.tableName)
      .where("id", id)
      .first()
      .leftJoin(
        db
          .select("reservations.guest_id")
          .count("reservations as total_reservations")
          .from("reservations")
          .where("reservations.start_date", "<", db.raw("now()"))
          .groupBy("reservations.guest_id")
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
