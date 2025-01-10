import type { Request, RequestHandler, Response } from "express";

import { roomService } from "@/api/rooms/roomService";
import { logger } from "@/app";

class RoomController {
  public getAllRooms: RequestHandler = async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;
    const offset = (page - 1) * limit;
    const { sortBy, sortDirection } = req.query;

    const rooms = await roomService.findAll({
      offset,
      limit: limit,
      sortBy: sortBy as string | undefined,
      sortDirection: sortDirection as string | undefined,
    });
    res.json({ ...rooms, limit, page });
  };

  public getRoom: RequestHandler = async (req: Request, res: Response) => {
    const room = await roomService.findById(req.params.id);
    res.json(room);
  };

  public createRoom: RequestHandler = async (req: Request, res: Response) => {
    const result = await roomService.create(req.body);
    res.json(result);
  };

  public updateRoom: RequestHandler = async (req: Request, res: Response) => {
    logger.debug(`id = ${req.params.id}`);
    const result = await roomService.update(req.params.id, req.body);
    res.json(result);
  };
}

export const roomController = new RoomController();
