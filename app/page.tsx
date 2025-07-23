import type { NextPage } from "next";
import Head from "next/head";
import Portfolio from "./components/portfolio";
import UnderConstructionBanner from "./components/underconstruction";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Milan C I - Portfolio</title>
        <meta name="description" content="Full-Stack Developer Portfolio" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <UnderConstructionBanner />
      <Portfolio />
    </>
  );
};

export default Home;
