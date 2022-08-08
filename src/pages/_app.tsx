import "../styles/globals.css";
import type { AppType } from "next/dist/shared/lib/utils";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import Head from "next/head";
import NProgress from "nprogress";
import { Router } from "next/router";
import "../styles/nprogress.css";
import Script from "next/script";

const MyApp: AppType = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  NProgress.configure({ showSpinner: false });
  Router.events.on("routeChangeStart", () => NProgress.start());
  Router.events.on("routeChangeComplete", () => NProgress.done());
  Router.events.on("routeChangeError", () => NProgress.done());
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
      <Script
        strategy="afterInteractive"
        data-website-id="ebf8a18f-e5be-4665-9181-3dcbb5921a46"
        src="https://umami.asheeshh.ga/umami.js"
      />
    </SessionProvider>
  );
};

export default MyApp;
