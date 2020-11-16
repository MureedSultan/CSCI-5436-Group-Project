import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";
import Layout from "../../components/Layout";
import ProductImages from "../../components/ProductImages";
import constants from "../../helpers/constants";
import fetch from "isomorphic-unfetch";
import Chip from "@material-ui/core/Chip";
import AddToCart from "../../components/Product/AddToCart";

const useStyles = makeStyles((theme) => {
  const spacing = theme.spacing(2, 0, 0);

  return {
    root: {
      flexGrow: 1,
      marginTop: theme.spacing(6),
    },
    spacing: {
      margin: spacing,
    },
    description: {
      margin: theme.spacing(8, 0, 0),
    },
    align: {
      display: "flex",
      alignItems: "center",
      "& > *": {
        padding: theme.spacing(1, 1, 0, 0),
      },
    },
  };
});

export const getServerSideProps = async (ctx) => {
  const {
    params: { id },
  } = ctx;
  const productRes = await fetch(`${constants.URL}/api/product/${id}`);
  const imageRes = await fetch(`${constants.URL}/api/productImages/${id}`);
  if (!productRes.ok || !imageRes.ok) {
    return {
      props: {},
      notFound: true,
    };
  }
  const product = await productRes.json();
  const images = await imageRes.json();
  return {
    props: { product, images },
  };
};

const ProductPage = ({ product, images }) => {
  const { productId, name, price, description, stock, rating } = product;
  const stockLabel = () => {
    return stock > 10 ? "In Stock" : stock >= 1 ? "Low Stock" : "Out Of Stock";
  };
  const classes = useStyles();
  return (
    <Layout>
      <Container>
        <div className={classes.root}>
          <Grid container justify="center" alignItems="center" spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <ProductImages images={images} />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Typography variant="h4" component="h1">
                {name}
              </Typography>
              <div className={classes.align}>
                <div>
                  <Chip size="small" color="primary" label={stockLabel()} />
                </div>
                <Rating name="read-only" value={rating} readOnly />
              </div>
              <Typography
                variant="h5"
                color={"secondary"}
                className={classes.spacing}
              >
                ${Number(price).toFixed(2)}
              </Typography>
              <div className={classes.spacing}>
                <AddToCart disabled={stock < 1} productId={productId} />
              </div>
              <List
                className={classes.description}
                subheader={
                  <Typography variant="h6" color="textSecondary">
                    Description
                  </Typography>
                }
              >
                {description.split("* ").map((line, index) => {
                  return line === "" ? null : (
                    <ListItem disableGutters key={index}>
                      <ListItemText secondary={line} />
                    </ListItem>
                  );
                })}
              </List>
            </Grid>
          </Grid>
        </div>
      </Container>
    </Layout>
  );
};

export default ProductPage;
