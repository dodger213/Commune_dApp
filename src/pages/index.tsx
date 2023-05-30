import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

const words = ["developers.", "designers.", "creators.", "everyone.", "<END>"]
const colour = ["text-[#00000]", "text-[#ffb4ed] dark:text-[#FFD6F5]", "text-[#FF8F8F]  dark:text-[#FF8F8F]", "text-[#ffef40] dark:text-[#FFF7A1]" ];

// clsx('hero hero--primary', styles.heroBanner)
function HomepageHeader() {

  
  const [index, setIntex] = React.useState(0);
  const [subIndex, setSubIndex] = React.useState(0);
  const [blink, setBlink] = React.useState(true);
  const [reverse, setReverse] = React.useState(false);

  useEffect(() => {
    if (index === words.length) return;
    if (subIndex === words[index].length + 1 && index !== words.length - 1 && !reverse) {
      setReverse(true);
      return;
    }
    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIntex((prev) => prev + 1);
      return;
    }
    if (index === words.length - 1) 
      setIntex(() => 0)
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, Math.max(reverse ? 75 : subIndex === words[index].length ? 1000 :
      75, 25));
    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse]);


  useEffect(() => {
    const timeout2 = setTimeout(() => {
      setBlink((prev) => !prev);
    }, 250);
      if (index === words.length) return;
      
    return () => clearTimeout(timeout2);
  }, [blink]);

  console.log(index, subIndex)

  const {siteConfig} = useDocusaurusContext();
  return (
    <header className=" dark:bg-[#161616] p-[4rem] py-44 text-center overflow-hidden">
      <div className="px-10 py-5">
        <div className='flex lg:flex-row flex-col h-1/2'>
        <div className='w-full lg:w-1/2 flex flex-col items-center justify-center'>
          <div className='p-6 w-[710px]'>
            <h1 className=" text-6xl pb-3 dark:text-white">{siteConfig.title}</h1>
            <p className="hero__subtitle text-4xl">{siteConfig.tagline}
            <br/>
            <span className={`hero__subtitle text-4xl ${colour[index]} font-semibold`}>{`${words[index].substring(0, subIndex)}${blink ? "|" : ""}`}</span></p>
            
          </div>
          <a href="docs/getting-started" className=' hover:no-underline'>
          <div className='bg-blue-700 rounded-lg shadow-lg hover:shadow-2xl text-center hover:bg-blue-600 duration-200 text-white hover:text-white font-sans font-semibold justify-center px-2 py-2 hover:border-blue-300 hover:border-2 hover:border-solid' >
            Get Started
          </div>
          </a>
        </div>

        <div className='w-full lg:w-[75%] lg:-mr-44 '>
          <img src="gif/logo/CubesShufflingGIF.gif" alt="Commune Logo" className=''/>
        </div>
      </div>
      </div>

    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Home`}
      description="Description will go into a meta tag in <head />">
      <main>
        <HomepageHeader />
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
