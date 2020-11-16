import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import fetch from "isomorphic-unfetch";
import { getSession } from "next-auth/client";
import React from "react";
import OrderItem from "../components/Cart/OrderItem";
import Layout from "../components/Layout.js";
import constants from "../helpers/constants";
import Empty from "../components/Cart/Empty";

export const getServerSideProps = async (context) => {
  const pageResponse = {
    props: {
      orderItems: null,
    },
  };
  const session = await getSession(context);
  if (session) {
    const res = await fetch(`${constants.URL}/api/cart`, {
      headers: { cookie: context.req.headers.cookie },
    });
    if (res.status === 200) {
      const { orderItems } = await res.json();
      pageResponse.props.orderItems = orderItems;
    }
  } else {
    pageResponse.redirect = {
      destination: "/api/auth/signin",
    };
  }
  return pageResponse;
};

const Cart = ({ orderItems }) => {
  console.log(orderItems);
  return (
    <Layout>
      <Container>
        <Box my={6}>
          <Typography variant="h4" component="h1" gutterBottom>
            Cart
          </Typography>
          {orderItems.length > 0 ? (
            orderItems.map(({ products, quantity }) => (
              <OrderItem product={products} quantity={quantity} />
            ))
          ) : (
            <div style={{ textAlign: "center" }}>
              <div style={{ width: "60vw", margin: "0 auto" }}>
                <Empty />
              </div>
              <Typography
                variant="h6"
                color="secondary"
                style={{ marginTop: "2em" }}
              >
                Nothing here....
              </Typography>
            </div>
          )}
        </Box>
      </Container>
    </Layout>
  );
};

export default Cart;
