import "@/styles/globals.css";
import type { AppProps } from "next/app";
import GlobalContext from "@/contexts";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GlobalContext>
      <Component {...pageProps} />
    </GlobalContext>
  );
}
