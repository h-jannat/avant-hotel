import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("reservations_rooms", (table) => {
    table.uuid("reservation_id");
    table.foreign("reservation_id").references("reservations.id");
    table.uuid("room_id");
    table.foreign("room_id").references("rooms.id");

    table.unique(["reservation_id", "room_id"]);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("reservations_rooms");
}
