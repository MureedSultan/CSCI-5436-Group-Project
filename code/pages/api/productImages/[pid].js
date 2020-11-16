import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(req, res) {
  const {
    query: { pid },
  } = req;

  if (!pid || isNaN(Number(pid))) {
    res.status(500).json({ error: "Invalid query" });
    return;
  }
  const productImages = await prisma.productImages.findMany({
    where: {
      productId: !pid ? undefined : Number(pid),
    },
  });
  if (!productImages) {
    res.status(404).end("Product not found");
  }
  res.status(200).json(productImages);
}
