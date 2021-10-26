import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../styles/theme";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "../contexts/AuthContext";
import { MapProvider } from "../contexts/MapContenxt";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ChakraProvider theme={theme} resetCSS>
        <MapProvider>
          <Component {...pageProps} />
        </MapProvider>
        <ToastContainer />
      </ChakraProvider>
    </AuthProvider>
  );
}
export default MyApp;
