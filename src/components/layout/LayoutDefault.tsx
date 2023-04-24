
import Head from "next/head";
import { ReactNode } from "react";
import ResponsiveAppBar from "../menu/ResponsiveAppBar";
import AbsoluteFooter from "./AbsoluteFooter";

interface LayoutProps {
  children: ReactNode;
}

export default function LayoutDefault({ children }: LayoutProps) {
  return (
    <>
      <ResponsiveAppBar></ResponsiveAppBar>
      <main className="mt-10 lg:mt-20">{children}</main>
      <AbsoluteFooter></AbsoluteFooter>
    </>
  );
}
