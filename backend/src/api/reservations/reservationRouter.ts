import express, { type Router } from "express";

import { reservationController } from "./reservationController";

export const reservationRouter: Router = express.Router();

reservationRouter.get("/", reservationController.getAllReservations);

reservationRouter.get("/:id", reservationController.getReservation);

reservationRouter.post("", reservationController.createReservation);

reservationRouter.patch("/:id", reservationController.updateReservation);
