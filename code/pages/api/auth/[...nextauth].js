import NextAuth from "next-auth";
import Providers from "next-auth/providers";

import constants from "../../../helpers/constants";

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient({
  errorFormat: "pretty",
  log: ["query", "info", "warn"],
});

const options = {
  providers: [
    Providers.Credentials({
      name: "Credentials",
      credentials: {
        username: {
          label: "Email",
          type: "text",
          placeholder: "jhon@abc.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        console.log(credentials);
        if (!credentials || !credentials.username || !credentials.password) {
          return Promise.resolve(null);
        }

        const user = await prisma.users.findOne({
          where: {
            email: credentials.username,
          },
        });
        if (!user) {
          return Promise.resolve(null);
        }
        const validUser = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (validUser) {
          return Promise.resolve(user);
        } else {
          return Promise.resolve(null);
        }
      },
    }),
  ],
  database: constants.DATABASE_URL,
  secret: constants.SECRET,

  session: {
    jwt: true,
  },
  jwt: {},
  pages: {},
  callbacks: {},
  events: {},
  debug: false,
};

export default (req, res) => NextAuth(req, res, options);
