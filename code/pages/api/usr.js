import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const password = "ms13797";
const rounds = 10;

const hashed = "$2b$10$E2CEtpBnO/C2JAYauJQmV..3IDyJ1.Y/nzdtnM4t3ZR//TWxR1Zxm";

const prisma = new PrismaClient({
  errorFormat: "pretty",
  log: ["query", "info", "warn"],
});

export default async function handle(req, res) {
  // const users = await prisma.usr.findMany();
  await bcrypt.hash(password, rounds, (err, hash) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(hash);
  });
  console.log(await bcrypt.compare(password, hashed));
  res.json(true);
}
