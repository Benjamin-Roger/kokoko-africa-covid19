import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import Header from "@/components/layout/Header/Header";
import Transition from "@/components/common/Transition";
import BackgroundDecoration from "@/components/layout/BackgroundDecoration";
import ToggleMapPanelBar from "@/components/navigation/ToggleMapPanelBar";
import Signature from '@/components/common/Signature'


const Layout = ({ children }) => {
  const { pathname } = useRouter();

  const pathnamesExcludingSearchbar = ["/country/[slug]"];

  return (
    <>

      <Header />

      <Transition location={pathname}>
        <main className="mt-8 mb-24">{children}</main>
      </Transition>

      <BackgroundDecoration />

      {pathnamesExcludingSearchbar.includes(pathname) ? "" : <ToggleMapPanelBar />}

      <div className="fixed hidden md:block h-screen top-0 left-0">
        <Signature side="left" />
      </div>
    </>
  );
};

export default Layout;
