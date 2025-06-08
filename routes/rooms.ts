import express, { Request, Response } from "express";
import Room from "../models/room";

const router = express.Router();

router.post("/add-room", async (req: any, res: any) => {
  try {
    const data = Array.isArray(req.body) ? req.body : [req.body];

    const missingFieldsIndex: number[] = [];

    const roomsToInsert = data.map((room:any, index: number) => {
      const {
        name,
        type,
        price,
        available,
        image,
        description,
        highlight,
        comfort,
        convenience,
        confidence,
      } = room;

      const missingFields = [];
      if (!name) missingFields.push("name");
      if (!type) missingFields.push("type");
      if (price === undefined) missingFields.push("price");
      if (available === undefined) missingFields.push("available");
      if (!image) missingFields.push("image");

      if (missingFields.length > 0) {
        missingFieldsIndex.push(index);
        return null;
      }

      return {
        name,
        type,
        price,
        available,
        image,
        description,
        highlight,
        comfort,
        convenience,
        confidence,
      };
    });

    // If any entries have missing required fields
    if (missingFieldsIndex.length > 0) {
      return res.status(400).json({
        error: `Missing required fields in entry index(es): ${missingFieldsIndex.join(", ")}`,
      });
    }

    const savedRooms = await Room.insertMany(roomsToInsert);

    res.status(201).json({
      message: `${savedRooms.length} room(s) created successfully`,
      rooms: savedRooms,
    });
  } catch (error) {
    // console.error("Error creating room(s):", error);
    res.status(500).json({ error: "Failed to create room(s)" });
  }
});

router.get("/rooms", async (req:any, res: any) => {
  try {
    const { type, page = 1, limit = 10 } = req.query;

    const query: any = {};
    if (type) query.type = type;

    const rooms = await Room.find(query)
      .skip((+page - 1) * +limit)
      .limit(+limit)
      .exec();

    const total = await Room.countDocuments(query);

    res.status(200).json({
      total,
      page: +page,
      limit: +limit,
      totalPages: Math.ceil(total / +limit),
      rooms,
    });
  } catch (error) {
    console.error("Error fetching rooms:", error);
    res.status(500).json({ error: "Failed to fetch rooms" });
  }
});

router.get("/rooms/:id", async (req: any, res: any) => {
  try {
    const { id } = req.params;

    const room = await Room.findById(id);

    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }

    res.status(200).json(room);
  } catch (error) {
    console.error("Error fetching room:", error);
    res.status(500).json({ error: "Failed to fetch room" });
  }
});

export default router;
