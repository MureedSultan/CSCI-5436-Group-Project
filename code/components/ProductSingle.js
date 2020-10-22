import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import { Card } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    maxWidth: 200,
  },
  card: {
    height: "100%",
  },
});

const ProductSingle = ({ image, title, description }) => {
  const classes = useStyles();
  const trim = ({ str, size }) => {
    return str.length >= size ? str.substr(0, size) + "..." : str;
  };
  return (
    <Card variant="elevation" elevation={0}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt={title}
          height="180"
          image={image}
          title={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2">
            {trim({ str: title, size: 25 })}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {trim({ str: description, size: 60 })}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

ProductSingle.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default ProductSingle;
