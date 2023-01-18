import "/styles/globals.css";
import { ClerkProvider, RedirectToSignIn, SignedIn, SignedOut } from '@clerk/nextjs'
import { useRouter } from 'next/router'

import Head from "next/head";


const publicPages = ["/", "/sign-in/[[...index]]", "/sign-up/[[...index]]"]

const MyApp = ({ Component, pageProps }) => {
  const { pathname } = useRouter()
  const isPublicPage = publicPages.includes(pathname)
  return (
    <ClerkProvider {...pageProps}>
      <Head>
        <title>Clerk + Next.js Starter</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      {isPublicPage ? (
          <Component {...pageProps} />
      ) : (
        <>
        <SignedIn>
          <Component {...pageProps} />
        </SignedIn>
        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
        </>
      )}
    </ClerkProvider>
  );
};

export default MyApp;
