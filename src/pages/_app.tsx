import LayoutDefault from "@/components/layout/LayoutDefault";
import AppThemeContextProvider from "@/components/theme/AppThemeContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import '@fontsource/ibm-plex-sans/400.css';
import '@fontsource/anton/400.css';
import '@fontsource/inter/400.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppThemeContextProvider attribute="class">
      <LayoutDefault>
        <Component {...pageProps} />
      </LayoutDefault>
    </AppThemeContextProvider>
  );
}
