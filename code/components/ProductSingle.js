import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import { Card } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import Link from "next/link";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 200,
  },
  card: {
    height: "100%",
  },
  name: {
    display: "-webkit-box",
    lineClamp: 2,
    "-webkit-box-orient": "vertical",
    overflow: "hidden",
  },
  description: {
    display: "-webkit-box",
    lineClamp: 3,
    "-webkit-box-orient": "vertical",
    overflow: "hidden",
  },
  cardContent: {
    padding: theme.spacing(2),
  },
  cardMedia: {
    width: "100%",
    objectFit: "none",
  },
  rating: {
    marginTop: theme.spacing(1),
  },
  price: {
    marginTop: theme.spacing(1),
  },
}));

const ProductSingle = ({ product }) => {
  const classes = useStyles();
  const { productId, name, description, price, thumbnail, rating } = product;

  return (
    <Link href={`/product/${productId}`}>
      <Card variant="elevation" elevation={0}>
        <CardActionArea>
          <CardMedia
            className={classes.cardMedia}
            component="img"
            alt={name}
            height="300"
            image={thumbnail}
            title={name}
          />
          <CardContent className={classes.cardContent}>
            <Typography
              gutterBottom
              variant="h6"
              component="h2"
              className={classes.name}
            >
              {name}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className={classes.description}
            >
              {description.replace("*", "").replaceAll(" *", " ")}
            </Typography>

            <Rating
              name="read-only"
              value={rating}
              readOnly
              className={classes.rating}
            />
            <Typography variant="h5" className={classes.price}>
              ${Number(price).toFixed(2)}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};

ProductSingle.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductSingle;
