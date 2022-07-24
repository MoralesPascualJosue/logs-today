import React from "react";
import ReactDOM from "react-dom";
import {ChakraProvider, ColorModeScript} from "@chakra-ui/react";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";

import {AuthContextProvider} from "./Context/AuthContext";
import App from "./App";
import theme from "./theme";
import {store} from "./Store/Store";

ReactDOM.render(
  <React.StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <Provider store={store}>
      <BrowserRouter>
        <ChakraProvider theme={theme}>
          <AuthContextProvider>
            <App />
          </AuthContextProvider>
        </ChakraProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root"),
);
