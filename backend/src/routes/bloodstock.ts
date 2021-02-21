import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import Joi from "joi";
import { auth } from "../middleware/auth";
// import { admin } from "../middleware/admin";

const prisma = new PrismaClient();
const bloodstock: Router = Router();
const getPagination = (page: number, size: number) => {
  const limit = size ? +size : 10;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (
  bloodstock: any,
  page: number,
  limit: number,
  totalItems: number
) => {
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, bloodstock, totalPages, currentPage };
};
bloodstock.get("/", async (req, res) => {
  try {
    const { page = 0, size = 7 }: any = req.query;
    const { limit, offset }: any = getPagination(page, size);
    const bloodstock = await prisma.bloodstock.findMany({
      take: Number(limit),
      skip: Number(offset),
      include: { bloodtypes: true },
    });
    const totalItems = await prisma.bloodstock.count();
    const data = getPagingData(bloodstock as any, page, limit, totalItems);
    res.send(data);
  } catch (err) {
    res.send(err);
  }
});

// bloodstock.get("/:id", async (req, res) => {
//     const { id } = req.params;
//     const stock = await prisma.bloodstock.findUnique({
//         where: { stockId: Number(id) },
//     });
//     if (stock === null)
//         return res
//             .status(404)
//             .send(`stock with the id: ${id}, was not found`);
//     res.send(stock);
// });

bloodstock.post("/", auth, async (req, res) => {
  try {
    const { bloodtypeId } = req.body;

    const bloodtype = await prisma.bloodtypes.findUnique({
      where: { bloodtypeId: bloodtypeId },
    });

    if (bloodtype === null)
      return res
        .status(400)
        .send(`bloodtype with the id: ${bloodtypeId}, was not found`);

    const { error } = validatestock(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const stock = await prisma.bloodstock.create({
      data: {
        amount: req.body.amount,
        bloodtypes: {
          connect: {
            bloodtypeId: bloodtypeId,
          },
        },
      },
      include: { bloodtypes: true },
    });
    res.send(stock);
  } catch (err) {
    res.status(500).send(`internal error`);
  }
});

bloodstock.put("/:id", auth, async (req: Request, res: Response) => {
  const { id } = req.params;
  const { bloodtypeId } = req.body;

  const bloodtype = await prisma.bloodtypes.findUnique({
    where: { bloodtypeId: bloodtypeId },
  });

  if (bloodtype === null)
    return res
      .status(400)
      .send(`bloodtype with the id: ${bloodtypeId}, was not found`);

  const { error } = validatestock(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const stock = await prisma.bloodstock.update({
      where: { stockId: Number(id) },
      data: {
        amount: req.body.amount,
        bloodtypes: {
          connect: {
            bloodtypeId: bloodtypeId,
          },
        },
      },
      include: { bloodtypes: true },
    });
    res.send(stock);
  } catch (err) {
    res.status(404).send("stock with the given id was not found");
  }
});

bloodstock.delete("/:id", auth, async (req, res) => {
  const { id } = req.params;
  try {
    const stock = await prisma.bloodstock.delete({
      where: { stockId: Number(id) },
    });
    res.send(stock);
  } catch (err) {
    res.status(404).send(`stock with the id: ${id}, was not found`);
  }
});

function validatestock(req: Request) {
  const schema = Joi.object({
    amount: Joi.number().required(),
    bloodtypeId: Joi.number().required(),
  });
  return schema.validate(req);
}

export default bloodstock;
