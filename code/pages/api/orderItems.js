import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(req, res) {
  const orderItems = await prisma.orderItems.findMany();
  res.json(orderItems);
}
