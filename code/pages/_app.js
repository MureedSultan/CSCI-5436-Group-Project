import React from "react";
import { Provider } from "next-auth/client";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import theme from "../helpers/theme";

export default function App({ Component, pageProps }) {
  React.useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>My page</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider
          options={{
            clientMaxAge: 0,
            keepAlive: 0,
          }}
          session={pageProps.session}
        >
          <Component {...pageProps} />
        </Provider>
      </ThemeProvider>
    </>
  );
}
