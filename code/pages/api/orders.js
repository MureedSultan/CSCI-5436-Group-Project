import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(req, res) {
  const orders = await prisma.orders.findMany();
  res.json(orders);
}
