import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import Joi from "joi";
import { auth } from "../middleware/auth";
// import { admin } from "../middleware/admin";

const prisma = new PrismaClient();
const patients: Router = Router();
const getPagination = (page: number, size: number) => {
  const limit = size ? +size : 10;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (
  patients: any,
  page: number,
  limit: number,
  totalItems: number
) => {
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, patients, totalPages, currentPage };
};
patients.get("/", async (req, res) => {
  try {
    const { page = 0, size = 7 }: any = req.query;
    const { limit, offset }: any = getPagination(page, size);
    const patients = await prisma.patients.findMany({
      take: Number(limit),
      skip: Number(offset),
      include: { bloodstock: true },
    });
    const totalItems = await prisma.patients.count();
    const data = getPagingData(patients as any, page, limit, totalItems);
    res.send(data);
  } catch (err) {
    res.send(err);
  }
});

// patients.get("/:id", async (req, res) => {
//     const { id } = req.params;
//     const patient = await prisma.patients.findUnique({
//         where: { patientId: Number(id) },
//     });
//     if (patient === null)
//         return res
//             .status(404)
//             .send(`patient with the id: ${id}, was not found`);
//     res.send(patient);
// });

patients.post("/", auth, async (req, res) => {
  try {
    const { stockId } = req.body;

    const stock = await prisma.bloodstock.findUnique({
      where: { stockId: stockId },
    });

    if (stock === null)
      return res
        .status(400)
        .send(`stock with the id: ${stockId}, was not found`);

    const { error } = validatepatient(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const patient = await prisma.patients.create({
      data: {
        patientname: req.body.patientname,
        amount: req.body.amount,
        bloodstock: {
          connect: {
            stockId: stockId,
          },
        },
      },
    });
    res.send(patient);
  } catch (err) {
    res.status(500).send(`internal error`);
  }
});

patients.put("/:id", auth, async (req: Request, res: Response) => {
  const { id } = req.params;
  const { stockId } = req.body;
  const { error } = validatepatient(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const patient = await prisma.patients.update({
      where: { patientId: Number(id) },
      data: {
        patientname: req.body.patientname,
        amount: req.body.amount,
        bloodstock: {
          connect: {
            stockId: stockId,
          },
        },
      },
      include: { bloodstock: true },
    });
    res.send(patient);
  } catch (err) {
    res.status(404).send("patient with the given id was not found");
  }
});

patients.delete("/:id", auth, async (req, res) => {
  const { id } = req.params;
  try {
    const patient = await prisma.patients.delete({
      where: { patientId: Number(id) },
    });
    res.send(patient);
  } catch (err) {
    res.status(404).send(`patient with the id: ${id}, was not found`);
  }
});

function validatepatient(req: Request) {
  const schema = Joi.object({
    stockId: Joi.number().required(),
    patientname: Joi.string().required(),
    amount: Joi.number().required(),
  });
  return schema.validate(req);
}

export default patients;
