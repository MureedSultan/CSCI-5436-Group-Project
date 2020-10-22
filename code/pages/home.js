import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import CategorySingle from "../components/CategorySingle";
import AppBar from "../components/PrimarySearchAppBar";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
  },
  tile: {
    height: "100%",
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
}));

const home = () => {
  const classes = useStyles();
  const items = [
    {
      image: "https://picsum.photos/300/300",
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      description:
        "orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      image: "https://picsum.photos/300/300",
      title: "Product",
      description:
        "orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      image: "https://picsum.photos/300/300",
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      description:
        "orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      image: "https://picsum.photos/300/300",
      title: "Product",
      description:
        "orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      image: "https://picsum.photos/300/300",
      title: "Product",
      description:
        "orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      image: "https://picsum.photos/300/300",
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      description:
        "orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ];
  return (
    <>
      <AppBar />
      <Container>
        <CategorySingle items={items} />
        <CategorySingle items={items} />
        <CategorySingle items={items} />
        {/* <Link href="/about" color="secondary">
            Go to the about page
          </Link> */}
      </Container>
    </>
  );
};

export default home;
