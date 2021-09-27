import Head from 'next/head' 

import "@/assets/styles/tailwind.css";
import "@/assets/styles/global.scss";

import Layout from "@/components/layout/Layout";

import useRouterScroll from "@/libs/hooks";

import { DefaultSEO } from "@/components/common/SEO.js";

export default function MyApp({ Component, pageProps }) {
  // Extra hook to force scroll to top behaviour when next/router navigation is used
  useRouterScroll();
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <DefaultSEO />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
