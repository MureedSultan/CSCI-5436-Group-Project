import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/client";

const prisma = new PrismaClient({
  errorFormat: "pretty",
  log: ["query", "info", "warn"],
});

export default async function handle(req, res) {
  const {
    query: { email },
    method,
  } = req;

  const user = await prisma.users.findOne({
    where: {
      email: email,
    },
  });

  res.status(200).json(user);
}
