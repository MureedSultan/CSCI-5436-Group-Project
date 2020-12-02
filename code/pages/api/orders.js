import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  errorFormat: "pretty",
  log: ["query", "info", "warn"],
});

export default async function handle(req, res) {
  const orders = await prisma.orders.findMany();
  res.json(orders);
}
