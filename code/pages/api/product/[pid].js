import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(req, res) {
  // const products = await prisma.product.findMany();
  res.status(200).json(req.query);
}
