import { Router, Request } from "express";
import { PrismaClient } from "@prisma/client";
import Joi from "joi";
import { auth } from "../middleware/auth";
import bloodstock from "./bloodstock";
import bloodtypes from "./bloodtypes";

const prisma = new PrismaClient();
const donations: Router = Router();

const getPagination = (page: number, size: number) => {
  const limit = size ? +size : 5;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (
  donations: any,
  page: number,
  limit: number,
  totalItems: number
) => {
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, donations, totalPages, currentPage };
};

donations.get("/", async (req, res) => {
  try {
    const { page, size }: any = req.query;
    const { limit, offset }: any = getPagination(page, size);
    const donations = await prisma.donations.findMany({
      take: Number(limit),
      skip: Number(offset),
      include: { donors: { include: { bloodtypes: true } }, bloodstock: true },
    });
    const totalItems = await prisma.donations.count();
    const data = getPagingData(donations as any, page, limit, totalItems);
    res.send(data);
  } catch (err) {
    res.send(err);
  }
});

// donations.get("/:id", async (req, res) => {
//     const { id } = req.params;
//     const donation = await prisma.donations.findUnique({
//         where: { donationId: Number(id) },
//     });
//     if (donation === null)
//         return res.status(404).send(`donation with the id: ${id}, was not found`);
//     res.send(donation);
// });

donations.post("/", auth, async (req, res) => {
  try {
    const { donorId, stockId } = req.body;

    const donor = await prisma.donors.findUnique({
      where: { donorId: donorId },
    });
    if (donor === null)
      return res
        .status(404)
        .send(`donor with the id: ${donorId}, was not found`);

    const stock = await prisma.bloodstock.findUnique({
      where: { stockId: stockId },
    });

    if (stock === null)
      return res
        .status(400)
        .send(`stock with the id: ${stockId}, was not found`);

    const { error } = validateDonation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const donation = await prisma.donations.create({
      data: {
        amount: req.body.amount,
        donors: {
          connect: {
            donorId: donorId,
          },
        },
        bloodstock: {
          connect: {
            stockId: stockId,
          },
        },
      },
      include: {
        bloodstock: true,
        donors: { include: { bloodtypes: true } },
      },
    });

    await prisma.bloodstock.update({
      where: { stockId: stockId },
      data: { amount: stock.amount + req.body.amount },
    });

    res.send(donation);
  } catch (err) {
    res.status(400).send(`Error ${err.message}`);
  }
});

donations.put("/:id", auth, async (req, res) => {
  const { id } = req.params;
  const { donorId, stockId } = req.body;

  const { error } = validateDonation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const donation = await prisma.donations.update({
      where: { donationId: Number(id) },
      data: {
        amount: req.body.amount,
        donors: {
          connect: {
            donorId: donorId,
          },
        },
        bloodstock: {
          connect: {
            stockId: stockId,
          },
        },
      },
      include: { bloodstock: true, donors: { include: { bloodtypes: true } } },
    });
    res.send(donation);
  } catch (err) {
    res.status(404).send("donation with the given id was not found");
  }
});

donations.delete("/:id", auth, async (req, res) => {
  const { id } = req.params;
  try {
    const donation = await prisma.donations.delete({
      where: { donationId: Number(id) },
    });
    res.send(donation);
  } catch (err) {
    res.status(404).send(`donation with the id: ${id}, was not found`);
  }
});

function validateDonation(req: Request) {
  const schema = Joi.object({
    amount: Joi.number().required(),
    donorId: Joi.number().required(),
    stockId: Joi.number().required(),
  });
  return schema.validate(req);
}

export default donations;
