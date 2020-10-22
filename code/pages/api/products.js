import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(req, res) {
  const { limit } = req.query;
  const products = await prisma.products.findMany({
    take: limit ? parseInt(limit) : undefined,
  });
  res.json(products);
}
