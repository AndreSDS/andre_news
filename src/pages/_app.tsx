import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Header } from "../components/Header";
import "../styles/global.scss";

const reposotiryName = process.env.PRISMIC_REPOSITORY_NAME;

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Header />
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
