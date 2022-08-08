import "../styles/globals.css";
import type { AppType } from "next/dist/shared/lib/utils";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import Head from "next/head";

const MyApp: AppType = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Best of Eden</title>
        <meta
          name="description"
          content="a place for ranking eden tracks from each album based on public votes"
        />
        <link rel="icon" href="https://i.imgur.com/JTGzPNw.png" />
      </Head>
      <Component {...pageProps} />
      <Toaster />
    </SessionProvider>
  );
};

export default MyApp;
