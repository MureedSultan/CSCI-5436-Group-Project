import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { signIn, useSession } from "next-auth/client";
import React from "react";

const Alert = (props) => <MuiAlert elevation={6} variant="filled" {...props} />;

const AddToCart = ({ disabled, productId }) => {
  const errorMessage = {
    severity: "error",
    message: "Error adding item to cart!",
  };
  const successMessage = {
    severity: "success",
    message: "Successfully added item to cart!",
  };
  const [session, loading] = useSession();

  const [alertOpen, setAlertOpen] = React.useState(false);
  const [alertContent, setAlertContent] = React.useState(errorMessage);

  const buttonClick = async () => {
    if (session) {
      console.log(session);
      const body = { productId };
      const res = await fetch("/api/cart", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      setAlertContent(res.status === 200 ? successMessage : errorMessage);
      setAlertOpen(true);
      console.log(await res.json());
    } else {
      signIn();
    }
  };

  const closeAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertOpen(false);
  };

  return (
    <>
      <Button
        size="large"
        variant="outlined"
        fullWidth
        color="primary"
        onClick={buttonClick}
        disabled={disabled}
      >
        Add to Cart
      </Button>
      <Snackbar open={alertOpen} autoHideDuration={6000} onClose={closeAlert}>
        <Alert onClose={closeAlert} severity={alertContent.severity}>
          {alertContent.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddToCart;
