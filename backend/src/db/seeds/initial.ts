import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("reservations_rooms").del();
  await knex("reservations").del();
  await knex("guests").del();
  await knex("rooms").del();
  // Inserts seed entries
  await knex("guests").insert([
    {
      id: "cfe6d1d6-e1ea-4448-bb76-f8543372aadd",
      email: "guest1@mail.com",
      phone: "111111",
      name: "guest",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: "f6ffcb89-64a5-41d9-9ba7-671d6b88cb07",
      email: "guest2@mail.com",
      phone: "222222",
      name: "guest2",
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);

  await knex("rooms").insert([
    {
      id: "564d9374-4ddd-43f2-823b-b3bc973c7ce3",
      name: "VIP",
      number: "101",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: "33c02941-ae43-43c9-a7f2-b2a608436c83",
      name: "Green Room",
      number: "201",
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);

  await knex("reservations").insert([
    {
      id: "8c4e5997-a75d-404c-be24-ecbb32df2746",
      start_date: new Date("2025-2-3"),
      end_date: new Date("2025-2-8"),
      guest_id: "cfe6d1d6-e1ea-4448-bb76-f8543372aadd",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: "2c6187e7-b0cc-41c8-80d8-8814a2c45ba9",
      start_date: new Date("2025-3-3"),
      end_date: new Date("2025-3-4"),
      guest_id: "f6ffcb89-64a5-41d9-9ba7-671d6b88cb07",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: "a7c289d9-5815-4ded-a061-c2155d8cd9b4",
      start_date: new Date("2025-3-3"),
      end_date: new Date("2025-3-4"),
      guest_id: "f6ffcb89-64a5-41d9-9ba7-671d6b88cb07",
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);

  await knex("reservations_rooms").insert([
    {
      reservation_id: "8c4e5997-a75d-404c-be24-ecbb32df2746",
      room_id: "564d9374-4ddd-43f2-823b-b3bc973c7ce3",
    },
    {
      reservation_id: "2c6187e7-b0cc-41c8-80d8-8814a2c45ba9",
      room_id: "564d9374-4ddd-43f2-823b-b3bc973c7ce3",
    },
    {
      reservation_id: "a7c289d9-5815-4ded-a061-c2155d8cd9b4",
      room_id: "33c02941-ae43-43c9-a7f2-b2a608436c83",
    },
  ]);
}
