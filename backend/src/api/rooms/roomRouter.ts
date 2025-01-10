// import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";

import { roomController } from "./roomController";

export const roomRouter: Router = express.Router();

roomRouter.get("/", roomController.getAllRooms);

roomRouter.get("/:id", roomController.getRoom);

roomRouter.post("", roomController.createRoom);

roomRouter.patch("/:id", roomController.updateRoom);
