import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("reservations", (table) => {
    table.uuid("id").primary().defaultTo(knex.fn.uuid());
    table.uuid("guest_id");
    table.foreign("guest_id").references("guests.id");
    table.date("start_date");
    table.date("end_date");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("reservations");
}
