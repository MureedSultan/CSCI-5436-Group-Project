import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(req, res) {
  const { products } = req.query;

  const categories = await prisma.categories.findMany({
    include: !products
      ? undefined
      : {
          products: {
            take: 5,
          },
        },
    orderBy: {
      name: "asc",
    },
  });
  res.json(categories);
}
