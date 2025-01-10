import type { Request, RequestHandler, Response } from "express";

import { logger } from "@/app";
import { reservationService } from "./reservationService";

class ReservationController {
  public getAllReservations: RequestHandler = async (
    req: Request,
    res: Response
  ) => {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;
    const offset = (page - 1) * limit;
    const { sortBy, sortDirection } = req.query;

    const reservations = await reservationService.findAll({
      offset,
      limit: limit,
      sortBy: sortBy as string | undefined,
      sortDirection: sortDirection as string | undefined,
    });
    res.json({ ...reservations, limit, page });
  };

  public getReservation: RequestHandler = async (
    req: Request,
    res: Response
  ) => {
    const reservation = await reservationService.findById(req.params.id);
    res.json(reservation).send();
  };

  public createReservation: RequestHandler = async (
    req: Request,
    res: Response
  ) => {
    const reservation = await reservationService.create(req.body);
    res.json(reservation).send();
  };

  public updateReservation: RequestHandler = async (
    req: Request,
    res: Response
  ) => {
    logger.debug(`id = ${req.params.id}`);
    const result = await reservationService.update(req.params.id, req.body);
    res.json(result).send();
  };
}

export const reservationController = new ReservationController();
