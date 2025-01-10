import { logger } from "@/app";
import db from "@/db";

export class ReservationRepository {
  tableName: string = "reservations";

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
    logger.debug("get reservations");
    return db("reservations")
      .select(
        "reservations.id",
        "reservations.guest_id",
        "guests.name as guest_name",
        "reservations.start_date",
        "reservations.end_date",
        db.raw("JSON_AGG(reservations_rooms.room_id) as rooms"),
        db.raw("COUNT(reservations_rooms.room_id) as total_rooms") // Aggregate rooms per reservation
      )
      .innerJoin("guests", "guests.id", "guest_id")
      .leftJoin(
        "reservations_rooms",
        "reservations_rooms.reservation_id",
        "reservations.id"
      )
      .groupBy("reservations.id", "guest_name")
      .orderBy(sortBy ?? "reservations.start_date", sortDirection ?? "asc")
      .limit(limit)
      .offset(offset);
  }

  async findTotal(): Promise<any> {
    return db(this.tableName).count();
  }

  async findByIdAsync(id: string): Promise<any> {
    return db.select().from(this.tableName).where("id", id).first();
  }

  async createAsync(createData: any): Promise<any> {
    const { guestId, startDate, endDate, roomIds } = createData;

    const overlappingReservation = await db
      .select()
      .from("reservations_rooms")
      .whereIn("room_id", roomIds)
      .join(
        "reservations",
        "reservations_rooms.reservation_id",
        "reservations.id"
      )
      .where(function () {
        this.where(function () {
          this.where(
            "reservations.start_date",
            "<=",
            new Date(createData.startDate)
          ).andWhere(
            "reservations.end_date",
            ">=",
            new Date(createData.startDate)
          );
        }).orWhere(function () {
          this.where(
            "reservations.start_date",
            "<=",
            new Date(createData.endDate)
          ).andWhere(
            "reservations.end_date",
            ">=",
            new Date(createData.endDate)
          );
        });
      })
      .orWhere(function () {
        this.where(
          "reservations.start_date",
          ">=",
          new Date(createData.startDate)
        ).andWhere("reservations.end_date", "<=", new Date(createData.endDate));
      })

      .first();

    if (overlappingReservation) {
      throw Error("Room not available");
    }
    console.log(guestId, startDate, endDate, roomIds);
    return db.transaction(async (trx) => {
      // Insert into reservations table
      const [{ reservationId }] = await trx(this.tableName)
        .insert({
          guest_id: guestId,
          start_date: startDate,
          end_date: endDate,
        })
        .returning("id");

      // Insert into reservations_rooms table
      const roomInsertData = roomIds.map((roomId: string) => ({
        reservation_id: reservationId,
        room_id: roomId,
      }));

      await trx("reservations_rooms").insert(roomInsertData);

      return {
        reservationId,
        message: "Reservation created successfully",
      };
    });
  }

  async updateAsync(id: string, updateData: any): Promise<any> {
    return db(this.tableName).update(updateData).where("id", id);
  }
}
