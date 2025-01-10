import express, { type Router } from "express";

import { guestController } from "./guestController";

export const guestRouter: Router = express.Router();

guestRouter.get("/", guestController.getAllGuests);

guestRouter.get("/:id", guestController.getGuest);

guestRouter.post("", guestController.createGuest);

guestRouter.patch("/:id", guestController.updateGuest);
