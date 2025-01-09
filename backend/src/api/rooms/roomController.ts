import type { Request, RequestHandler, Response } from "express";

import { roomService } from "@/api/rooms/roomService";
import { logger } from "@/app";

class RoomController {
  public getAllRooms: RequestHandler = async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string, 10) || 1;
    const perPage = parseInt(req.query.perPage as string, 10) || 10;
    const offset = (page - 1) * perPage;
    const { sortBy, sortDirection } = req.query;

    const rooms = await roomService.findAll({
      offset,
      limit: perPage,
      sortBy: sortBy as string | undefined,
      sortDirection: sortDirection as string | undefined,
    });
    res.json(rooms);
  };

  public getRoom: RequestHandler = async (req: Request, res: Response) => {
    const room = await roomService.findById(req.params.id);
    res.json(room).send();
  };

  public createRoom: RequestHandler = async (req: Request, res: Response) => {
    await roomService.create(req.body);
    res.json({ message: "room is created" }).send();
  };

  public updateRoom: RequestHandler = async (req: Request, res: Response) => {
    logger.debug(`id = ${req.params.id}`);
    const result = await roomService.update(req.params.id, req.body);
    res.json(result).send();
  };
}

export const roomController = new RoomController();
