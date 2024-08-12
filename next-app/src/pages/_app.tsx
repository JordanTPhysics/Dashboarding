import Footer from '../components/Footer'
import Header from '../components/Header'
import '../styles/globals.css'

import type { AppProps } from 'next/app'

export default function MyApp({ Component, pageProps }: AppProps) {


  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  )
}