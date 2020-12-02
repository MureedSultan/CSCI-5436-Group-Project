import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  errorFormat: "pretty",
  log: ["query", "info", "warn"],
});

const handleGet = async ({ id, res }) => {
  if (!id || isNaN(Number(id))) {
    res.status(500).json({ error: "Invalid query" });
    return;
  }
  const productById = await prisma.products.findOne({
    where: {
      productId: !id ? undefined : Number(id),
    },
    include: {
      categories: true,
    },
  });
  if (!productById) {
    res.status(404).end("Product not found");
  }
  res.status(200).json(productById);
};

export default async function handle(req, res) {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "GET":
      await handleGet({ id, res });
      break;
    case "PUT":
      res.json();
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
