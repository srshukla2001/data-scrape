import '@/styles/globals.css';
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>Best AI-Powered Youtube Seo | HighPre.com</title> {/* Add your global title here */}
      </Head>
      <Component {...pageProps} />
    </>
  );
}
