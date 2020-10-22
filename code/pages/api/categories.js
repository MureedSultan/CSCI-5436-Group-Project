import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(req, res) {
  const categories = await prisma.categories.findMany({
    include: {
      product: true,
    },
  });
  res.json(categories);
}
