import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ProductSingle from "../components/ProductSingle";
import PropTypes from "prop-types";
import { Box } from "@material-ui/core";
import { spacing } from "@material-ui/system";
const CategorySingle = ({ items }) => {
  return (
    <Box my={6}>
      <Box mb={3}>
        <Typography variant="h4" component="h1" gutterBottom>
          Sample Category
        </Typography>
      </Box>
      <Grid container spacing={3} alignItems="stretch">
        {items.map(({ title, image, description }) => {
          return (
            <Grid item xs={12} md={2}>
              <ProductSingle
                title={title}
                image={image}
                description={description}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

CategorySingle.propTypes = {
  items: PropTypes.array.isRequired,
};

export default CategorySingle;
