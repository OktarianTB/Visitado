import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { unstable_createMuiStrictModeTheme as createMuiTheme } from "@material-ui/core";
import { ThemeProvider, Grow } from "@material-ui/core/";
import { SnackbarProvider } from "notistack";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#7e57c2",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#ff1744",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <SnackbarProvider
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      TransitionComponent={Grow}
    >
      <React.StrictMode>
        <App />{" "}
      </React.StrictMode>
    </SnackbarProvider>
  </ThemeProvider>,
  document.getElementById("root")
);
