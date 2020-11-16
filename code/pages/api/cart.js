import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/client";

const prisma = new PrismaClient({
  errorFormat: "pretty",
  log: ["query", "info", "warn"],
});

const createCart = async ({ email }) => {
  return await prisma.orders.create({
    data: {
      status: "Cart",
      users: {
        connect: {
          email: email,
        },
      },
    },
    include: {
      orderItems: true,
    },
  });
};

const upsertOrderItem = async ({ orderId, productId }) => {
  return await prisma.orderItems.upsert({
    where: {
      orderId_productId: {
        orderId: orderId,
        productId: productId,
      },
    },
    create: {
      orders: {
        connect: {
          orderId: orderId,
        },
      },
      products: {
        connect: {
          productId: productId,
        },
      },
    },
    update: {
      quantity: {
        increment: 1,
      },
    },
  });
};

const getCartByEmail = async ({ email }) => {
  const response = await prisma.users.findOne({
    where: {
      email: email,
    },
    select: {
      orders: {
        where: {
          status: "Cart",
        },
        take: 1,
        include: {
          orderItems: {
            include: {
              products: {
                select: {
                  productId: true,
                  name: true,
                  thumbnail: true,
                  price: true,
                  stock: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (response && response.orders) {
    const {
      orders: [order],
    } = response;
    if (!order) {
      const newCart = await createCart({ email });
      return newCart;
    } else {
      return order;
    }
  }
};

const handleGet = async ({ user: { email }, res }) => {
  const cart = await getCartByEmail({ email });
  res.status(200).json(cart);
};

const handlePut = async ({
  user: { email },
  req: {
    body: { productId },
  },
  res,
}) => {
  const cart = await getCartByEmail({ email });
  const { orderId } = cart;
  const orderItem = await upsertOrderItem({ orderId, productId });
  res.status(200).json(orderItem);
};

export default async function handle(req, res) {
  const { method } = req;
  const session = await getSession({ req });
  if (!session || !session.user) {
    res
      .status(401)
      .end("You must be signed in to view the protected content on this page.");
    return;
  }
  const { user } = session;
  switch (method) {
    case "GET":
      await handleGet({ user, res });
      break;
    case "PUT":
      await handlePut({ user, req, res });
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${method} not allowed`);
  }
}
