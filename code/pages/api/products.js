import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  errorFormat: "pretty",
  log: ["query", "info", "warn"],
});

export default async function handle(req, res) {
  const { name, category, categoryName, limit } = req.query;
  const products = await prisma.products.findMany({
    take: limit ? parseInt(limit) : 10,
    where: {
      name: {
        contains: !name ? undefined : name,
      },
      categories: {
        categoryId: !category ? undefined : parseInt(category),
        name: !categoryName ? undefined : categoryName,
      },
    },
    orderBy: { name: "asc" },
  });
  res.json(products);
}
