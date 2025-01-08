import type { Request, RequestHandler, Response } from "express";

import { roomService } from "@/api/room/roomService";

class RoomController {
  public getAllRooms: RequestHandler = async (_req: Request, res: Response) => {
    const users = await roomService.findAll();
    res.json(users);
  };

  public getUser: RequestHandler = async (req: Request, res: Response) => {
    const id = Number.parseInt(req.params.id as string, 10);
    const user = await roomService.findById(id);
    res.json(user).send();
  };
}

export const roomController = new RoomController();
