import type { NextPage } from "next";
import Head from "next/head";
import Portfolio from "./components/portfolio";
import UnderConstructionBanner from "./components/underconstruction";
// import CursorFollower from "./components/cursorfollowe";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Milan C I - Portfolio</title>
        <meta name="description" content="Portfolio of Milan CI – Web Developer showcasing modern projects and skills." />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <UnderConstructionBanner />
      {/* <CursorFollower/> */}
      <Portfolio />
    </>
  );
};

export default Home;
