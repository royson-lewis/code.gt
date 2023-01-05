import React from 'react'

import Head from 'next/head'

import HomeMain from '../view/screens/home/main'

const HomeIndex: React.FC = () => (
  <>
    <Head>
      <title>Home - Gametech</title>
      <meta
        name="description"
        content="GT Description"
      />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Home - Gametech" />
      <meta
        property="og:description"
        content="GT Description"
      />
      <meta property="og:url" content="http://www.code-gt.com/" />
      <meta property="og:site_name" content="Gametech" />
    </Head>
    <HomeMain />
  </>
)

export default HomeIndex
