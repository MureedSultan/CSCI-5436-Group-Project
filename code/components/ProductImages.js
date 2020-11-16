import { makeStyles } from "@material-ui/core/styles";
import Carousel from "react-material-ui-carousel";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "scale-down",
  },
  carousel: {
    width: "100%",
  },
  imageWrapper: {
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      height: "30vh",
    },
    [theme.breakpoints.up("md")]: {
      height: "80vh",
    },
  },
}));

const ProductImages = ({ images }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Carousel
        autoPlay={false}
        animation={"slide"}
        className={classes.carousel}
      >
        {images.map(({ url, imageId }) => (
          <div className={classes.imageWrapper} key={imageId}>
            <img src={url} alt={imageId} className={classes.image} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ProductImages;
