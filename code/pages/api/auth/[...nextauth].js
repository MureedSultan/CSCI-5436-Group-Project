import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const options = {
  providers: [
    Providers.Credentials({
      name: 'Credentials',
      credentials: {
        username: {
          label: 'Email',
          type: 'text',
          placeholder: 'sultan@test.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        console.log(credentials);
        if (!credentials || !credentials.username || !credentials.password) {
          return Promise.resolve(null);
        }

        const user = await prisma.user.findOne({
          where: {
            email: credentials.username,
          },
        });
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
  database: process.env.DATABASE_URL,
  secret: process.env.SECRET,

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
