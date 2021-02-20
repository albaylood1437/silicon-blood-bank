import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import Joi from "joi";
import { auth } from "../middleware/auth";
// import { admin } from "../middleware/admin";

const prisma = new PrismaClient();
const booking: Router = Router();
const getPagination = (page: number, size: number) => {
  const limit = size ? +size : 10;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (
  booking: any,
  page: number,
  limit: number,
  totalItems: number
) => {
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, booking, totalPages, currentPage };
};
booking.get("/", async (req, res) => {
  try {
    const { page, size }: any = req.query;
    const { limit, offset }: any = getPagination(page, size);
    const booking = await prisma.booking.findMany({
      take: Number(limit),
      skip: Number(offset), // Skip the cursor
      orderBy: [
        {
          bookingId: "asc",
        },
      ],
    });
    const totalItems = await prisma.booking.count();
    const data = getPagingData(booking as any, page, limit, totalItems);
    res.send(data);
  } catch (err) {
    res.send(err);
  }
});

// booking.get("/:id", async (req, res) => {
//     const { id } = req.params;
//     const book = await prisma.booking.findUnique({
//         where: { bookingId: Number(id) },
//     });
//     if (book === null)
//         return res
//             .status(404)
//             .send(`book with the id: ${id}, was not found`);
//     res.send(book);
// });

booking.post("/", auth, async (req, res) => {
  try {
    const { bloodtypeId } = req.body;

    const bloodtype = await prisma.bloodtypes.findUnique({
      where: { bloodtypeId: bloodtypeId },
    });

    if (bloodtype === null)
      return res
        .status(400)
        .send(`bloodtype with the id: ${bloodtypeId}, was not found`);

    const { error } = validatebook(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const book = await prisma.booking.create({
      data: {
        firstname: req.body.firstname,
        secondname: req.body.secondname,
        lastname: req.body.lastname,
        appointment: req.body.appointment,
        gender: req.body.gender,
        contact: req.body.contact,
        city: req.body.city,
        bloodtypes: {
          connect: {
            bloodtypeId: bloodtypeId,
          },
        },
      },
      include: {
        bloodtypes: true,
      },
    });

    res.send(book);
  } catch (err) {
    res.status(500).send(`internal error`);
  }
});

booking.put("/:id", auth, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { bloodtypeId } = req.body;

    const { error } = validatebook(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const book = await prisma.booking.update({
      where: { bookingId: Number(id) },
      data: {
        firstname: req.body.firstname,
        secondname: req.body.secondname,
        lastname: req.body.lastname,
        gender: req.body.gender,
        appointment: req.body.appointment,
        contact: req.body.contact,
        city: req.body.city,
        bloodtypes: {
          connect: {
            bloodtypeId: bloodtypeId,
          },
        },
      },
      include: { bloodtypes: true },
    });
    res.send(book);
  } catch (err) {
    res.status(404).send("book with the given id was not found");
  }
});

booking.delete("/:id", auth, async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const book = await prisma.booking.delete({
      where: { bookingId: Number(id) },
    });
    res.send(book);
  } catch (err) {
    res.status(404).send(`book with the id: ${id}, was not found`);
  }
});

function validatebook(req: Request) {
  const schema = Joi.object({
    firstname: Joi.string().min(2).max(50).required(),
    secondname: Joi.string().min(2).max(50).required(),
    lastname: Joi.string().min(2).max(50).required(),
    gender: Joi.string().valid("male", "female").required(),
    contact: Joi.string().required(),
    bloodtypeId: Joi.number().required(),
    city: Joi.string().required(),
    appointment: Joi.date().required(),
  });
  return schema.validate(req);
}

export default booking;
