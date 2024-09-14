import React from 'react'
import '../styles/globals.css'

import dynamic from 'next/dynamic'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { DataProvider } from '../lib/DataProvider'

const Sidebar = dynamic(() => import('../components/Sidebar'), { ssr: false })

export default function MyApp({ Component, pageProps }: AppProps) {

  return (
    <>
    <Head>
      <title>G Rate Places</title>
      <meta name="description" content="G Rate Places Dashboard" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
      <Sidebar>
        <DataProvider>
          <Component {...pageProps} />
        </DataProvider>
      </Sidebar>
    </>
  )
}