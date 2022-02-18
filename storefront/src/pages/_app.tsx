import React, { FC } from "react";
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import axios from "axios";

//-- Config
import { Env } from "../config";

//-- Store
import store, { persistor } from "../redux/Store";

//-- Css
import "../styles/index.scss";

//-- Config Axios
axios.defaults.baseURL = Env.apiHost;
axios.defaults.timeout = 30000;

const App: FC<AppProps> = ({ Component, pageProps }) => {
  // console.clear()
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
};

export default App;
