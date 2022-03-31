import "../styles/globals.css";
import "./api/Firebase";
import { store } from "../redux/store";
import { Provider } from "react-redux";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
