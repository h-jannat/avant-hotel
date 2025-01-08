import dotenv from "dotenv";
dotenv.config({ path: "../../.env" }); //knex in node_modules

import config from "./knexfile";

export default config;
