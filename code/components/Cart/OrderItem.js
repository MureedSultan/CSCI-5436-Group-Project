import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Chip from "@material-ui/core/Chip";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CardHeader from "@material-ui/core/CardHeader";
import TextField from "@material-ui/core/TextField";
import DeleteIcon from "@material-ui/icons/Delete";
import React from "react";

const useStyles = makeStyles((theme) => {
  return {
    // imageWrapper: {
    //   width: defaultSpacing,
    //   height: defaultSpacing,
    //   marginRight: defaultMargin,
    //   [theme.breakpoints.up("md")]: {
    //     width: defaultSpacing * 2,
    //     height: defaultSpacing * 2,
    //     marginRight: defaultMargin * 2,
    //   },
    //   [theme.breakpoints.up("lg")]: {
    //     width: defaultSpacing * 3,
    //     height: defaultSpacing * 3,
    //     marginRight: defaultMargin * 3,
    //   },
    // },
    // image: {
    //   objectFit: "cover",
    // },
    // block: {
    //   display: "block",
    //   margin: theme.spacing(1, 0, 0, 0),
    // },
    // input: {
    //   width: "9ch",
    // },
    // name: {
    //   fontSize: "1.25rem",
    //   [theme.breakpoints.up("md")]: {
    //     fontSize: "1.75rem",
    //   },
    // },
    // vertical: {
    //   margin: theme.spacing(2, 0, 0, 0),
    //   display: "flex",
    //   alignItems: "center",
    // },
    // price: {
    //   marginLeft: theme.spacing(2),
    // },
    //test
    root: {
      display: "flex",
    },
    details: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
    },
    content: {
      flex: "1 0 auto",
    },
    cover: {
      display: "none",
      width: theme.spacing(24),
      height: "100%",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
    name: {
      display: "-webkit-box",
      lineClamp: 1,
      "-webkit-box-orient": "vertical",
      overflow: "hidden",
    },
    controls: {
      justifyContent: "flex-end",
    },
    price: {
      margin: 0,
    },
  };
});

const OrderItem = ({
  product: { productId, name, thumbnail, price, stock },
  quantity,
}) => {
  const [itemQuantity, setItemQuantity] = React.useState(quantity);

  const changeItemQuantity = (event) => {
    setItemQuantity(event.target.value);
  };

  const classes = useStyles();
  const stockLabel = () => {
    return stock > 10 ? "In Stock" : stock >= 1 ? "Low Stock" : "Out Of Stock";
  };
  return (
    <Box my={3}>
      <Card variant="outlined" className={classes.root}>
        <div>
          <CardMedia className={classes.cover} image={thumbnail} title={name} />
        </div>
        <div className={classes.details}>
          <CardHeader
            disableTypography
            classes={{
              action: classes.price,
            }}
            title={
              <Typography variant="h5" className={classes.name}>
                {name}
              </Typography>
            }
            subheader={
              <Chip
                size="small"
                variant="outlined"
                color="secondary"
                label={stockLabel()}
              />
            }
            action={
              <Typography variant="h5" color="secondary">
                ${Number(price * itemQuantity).toFixed(2)}
              </Typography>
            }
          />
          <CardActions className={classes.controls}>
            <TextField
              id="itemQuantity"
              type="number"
              size="small"
              variant="outlined"
              className={classes.input}
              InputProps={{ inputProps: { min: 1, max: 99 } }}
              value={itemQuantity}
              onChange={changeItemQuantity}
            />
            <IconButton aria-label="add to favorites">
              <DeleteIcon color="secondary" />
            </IconButton>
          </CardActions>
        </div>
      </Card>
    </Box>
    // <Box alignItems="flex-start" key={productId}>
    //   <div>
    //     <div>
    //       <Avatar
    //         alt={name}
    //         variant="rounded"
    //         src={thumbnail}
    //         classes={{
    //           img: classes.image,
    //           root: classes.imageWrapper,
    //         }}
    //       />
    //     </div>
    //     <div>
    //       <Typography variant="h5" className={classes.name}>
    //         {name}
    //       </Typography>
    //       <div className={classes.block}>
    //         <Chip
    //           size="small"
    //           variant="outlined"
    //           color="primary"
    //           label={stockLabel()}
    //         />
    //       </div>
    //       <div className={classes.vertical}>
    //         <TextField
    //           id="itemQuantity"
    //           type="number"
    //           size="small"
    //           variant="outlined"
    //           className={classes.input}
    //           InputProps={{ inputProps: { min: 1, max: 99 } }}
    //           value={itemQuantity}
    //           onChange={changeItemQuantity}
    //         />
    //         <Typography
    //           variant="h5"
    //           color="secondary"
    //           className={classes.price}
    //         >
    //           ${Number(price * itemQuantity).toFixed(2)}
    //         </Typography>
    //         <IconButton edge="end" aria-label="delete">
    //           <DeleteIcon color="secondary" />
    //         </IconButton>
    //       </div>
    //     </div>
    //   </div>
    // </Box>
  );
};

export default OrderItem;
