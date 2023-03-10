import '@/styles/globals.css'
import { QueryClientProvider, QueryClient } from "react-query";
import type { AppProps } from "next/app"
import type { Session } from "next-auth"
import { SessionProvider } from "next-auth/react";

import '../styles/globals.css';

const queryClient = new QueryClient()

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </SessionProvider>
  )
}
