import '@/styles/globals.css'
import { QueryClientProvider, QueryClient } from "react-query";
import type { AppProps } from "next/app"
import type { Session } from "next-auth"
import { SessionProvider } from "next-auth/react";

import '../styles/globals.css';
import Head from "next/head";

const queryClient = new QueryClient()

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session}>
      <Head>
        <meta charSet="utf-8" /><meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        <meta http-equiv="content-type" content="text/html; charset=UTF-8" />
        <meta name="referrer" content="always" />
        <meta http-equiv="X-UA-Compatible" />
        <link rel="canonical" href="https://wwww.virtualwardrobe.co" />
        <title>Virtual wardrobe and AI stylist</title>
        <meta name="twitter:label1" content="Virtual Wardrobe" /><meta name="twitter:domain" content="virtualwardrobe.co" />
        <meta name="twitter:card" content="summary_large_image" /><meta name="description" content="Your entire wardrobe in one place and let our Ai stylist recommend outfits for you." />
        <meta name="keywords" content="virtual wardrobe, ai, stylist, outfit recommendation" />
        <meta name="fragment" content="!" />
        <meta name="robots" content="index,follow" /><meta property="og:title" content="Virtual Wardrobe and Ai stylist" />
        <meta property="og:description" content="our entire wardrobe in one place and let our Ai stylist recommend outfits for you." />
        <meta property="og:image" content="https://www.virtualwardrobe.co/og.png" />
        <meta property="og:url" content="https://www.virtualwardrobe.co" />
        <meta name="twitter:title" content="Virtual Wardrobe and Ai stylist" />
        <meta name="twitter:data1" content="" />
        <meta name="twitter:description" content="Your entire wardrobe in one place and let our Ai stylist recommend outfits for you." />
        <meta name="twitter:image:alt" content="Virtual Wardrobe" />
        <meta name="twitter:image" content="https://www.virtualwardrobe.co/og.png" />
        <meta name="twitter:image:src" content="https://www.virtualwardrobe.co/og.png" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </SessionProvider>
  )
}
