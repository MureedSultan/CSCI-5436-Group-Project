// import Box from "@material-ui/core/Box";
import fetch from "isomorphic-unfetch";
import Container from "@material-ui/core/Container";
import constants from "../helpers/constants";
import { makeStyles } from "@material-ui/core/styles";
import CategorySingle from "../components/CategorySingle";

import Layout from "../components/Layout";

export const getServerSideProps = async () => {
  const res = await fetch(`${constants.URL}/api/categories?products=true`);
  const categories = await res.json();
  return {
    props: { categories },
  };
};

const home = ({ categories }) => {
  return (
    <Layout>
      <Container>
        {categories.map((category) => (
          <CategorySingle key={category.categoryId} category={category} />
        ))}
      </Container>
    </Layout>
  );
};

export default home;
