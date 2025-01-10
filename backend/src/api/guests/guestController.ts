import type { Request, RequestHandler, Response } from "express";

import { guestService } from "@/api/guests/guestService"; // Updated to guestService
import { logger } from "@/app";

class GuestController {
  public getAllGuests: RequestHandler = async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;
    const offset = (page - 1) * limit;
    const { sortBy, sortDirection } = req.query;

    const guests = await guestService.findAll({
      offset,
      limit: limit,
      sortBy: sortBy as string | undefined,
      sortDirection: sortDirection as string | undefined,
    });

    res.json({
      ...guests,
      limit,
      page,
    });
  };

  public getGuest: RequestHandler = async (req: Request, res: Response) => {
    const guest = await guestService.findById(req.params.id);
    res.json(guest).send();
  };

  public createGuest: RequestHandler = async (req: Request, res: Response) => {
    await guestService.create(req.body);
    res.json({ message: "Guest is created" }).send();
  };

  public updateGuest: RequestHandler = async (req: Request, res: Response) => {
    logger.debug(`id = ${req.params.id}`);
    const result = await guestService.update(req.params.id, req.body);
    res.json(result).send();
  };
}

export const guestController = new GuestController();
