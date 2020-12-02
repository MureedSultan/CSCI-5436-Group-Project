import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ProductSingle from "../components/ProductSingle";
import PropTypes from "prop-types";
import { Box } from "@material-ui/core";
const CategorySingle = ({ category }) => {
  // console.log(products);
  const { name, products } = category;
  return (
    <Box my={6}>
      <Box mb={3}>
        <Typography variant="h4" component="h1" gutterBottom>
          {name}
        </Typography>
      </Box>
      <Grid container spacing={1} alignItems="stretch">
        {products.map((product) => {
          return (
            <Grid key={product.productId} item xs={12} sm={6} md>
              <ProductSingle product={product} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

CategorySingle.propTypes = {
  category: PropTypes.object.isRequired,
};

export default CategorySingle;
