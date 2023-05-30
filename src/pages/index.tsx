import React from 'react';
// import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import WelcomeSection from '@site/src/components/Welcome/index';
import {getHeaderClasses} from '@site/src/components/utils';
import {Feature} from '../components/Features/index';
const words = ["developers.", "designers.", "creators.", "everyone.", "<END>"]
const colour = ["text-[#00000]", "text-[#ffb4ed] dark:text-[#FFD6F5]", "text-[#FF8F8F]  dark:text-[#FF8F8F]", "text-[#ffef40] dark:text-[#FFF7A1]" ];

function HomepageHeader() {

  
  const [index, setIndex] = React.useState(0); // index of word
  const [subIndex, setSubIndex] = React.useState(0); // index of letter
  const [blink, setBlink] = React.useState(true); // blinker
  const [reverse, setReverse] = React.useState(false); // reverse

  // state of the scroll position and header height
  const [scrollPosition, setScrollPosition] = React.useState(0);// scroll position
  const headerRef = React.useRef(null); // header ref
  const [headerHeight, setHeaderHeight] = React.useState(20); // header height
  

  // typeWriter effect
  // give me the context of this whole useEffect
  React.useEffect(() => {
    if (index === words.length) return; // if end of words, return
    // if subIndex is equal to the length of the word + 1 and index is not the last word and not reverse
    if (subIndex === words[index].length + 1 && index !== words.length - 1 && !reverse) {
      setReverse(true);
      return;
    }
    // if subIndex is equal to 0 and reverse is true
    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => prev + 1);
      return;
    }
    // if reverse is true, subIndex is not 0 and index is not the last word
    if (index === words.length - 1) 
      setIndex(() => 0)
    // if reverse is true, subIndex is not 0 and index is not the last word
    // if reverse is false, subIndex is not the length of the word and index is not the last word
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, Math.max(reverse ? 75 : subIndex === words[index].length ? 1000 :
      75, 25));
    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse]);


  // blinker effect
  React.useEffect(() => {
    const timeout2 = setTimeout(() => {
      setBlink((prev) => !prev);
    }, 250);
      if (index === words.length) return;
      
    return () => clearTimeout(timeout2);
  }, [blink]);

  // Handle scroll position
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  // Add scroll event listener to window
  React.useEffect(() => {
      window.addEventListener('scroll', handleScroll, { passive: true });

      return () => {
          window.removeEventListener('scroll', handleScroll);
      };
  }, []);

  // Get header height on mount and when window is resized
  // This is to offset the scroll position so that the header
  React.useEffect(() => {
    if (headerRef?.current) {
      setHeaderHeight(headerRef.current.clientHeight);
    }
  }, [headerRef.current]);

  
  // console.log(headerHeight) // **DEBUG CONSOLE 😃**

  const {siteConfig} = useDocusaurusContext();
  
  return (
    <header ref={headerRef} className={` dark:bg-[#161616] p-[4rem] py-32 text-center overflow-hidden ${getHeaderClasses(scrollPosition, headerHeight)} duration-500`} >
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
        <WelcomeSection />
        <section id="#blue" className='pt-10'>
          <div className=' p-10'>
            <div className=' mt-10 flex lg:flex-row flex-col items-center justify-center gap-10  dark:bg-[linear-gradient(180deg,#1b1b1d,#84b9f7)] bg-[linear-gradient(180deg,#ffffff,#84b9f7)] rounded-lg shadow-xl'>
                <div>
                  <img src='./gif/cubes/blue_small.gif' className='w-[200px] h-[200px] hover:w-[300px] hover:h-[300px] duration-300'></img>
                </div>

                <div className=' flex flex-col justify-evenly items-center'>
                  {/* <h2>Title</h2> */}
                  {/* <Feature title="Hello World" description="This is an example of a feature" className="m-10 hover:shadow-2xl w-full rounded-lg shadow-lg dark:bg-[#161616] duration-200 bg-[#fcfcfc] ">
                    <img src="./svg/commune.svg"/>
                  </Feature> */}
                </div>
              </div>
          </div>
        </section>

        <section id="#green" className='pt-10'>
          <div className=' p-10'>
            {/* c3f7c8  7dda8d*/}
            <div className=' mt-10 flex lg:flex-row flex-col items-center justify-center dark:bg-[linear-gradient(180deg,#1b1b1d,#c3f7c8)] bg-[linear-gradient(180deg,#ffffff,#c3f7c8)] rounded-lg shadow-xl'>
                <div className='flex-none'>
                  <img src='./gif/cubes/green_small.gif' className='w-[200px] h-[200px] hover:w-[300px] hover:h-[300px] duration-300'></img>
                </div>
                
                {/* <div className=' flex-initial'>
                <div className='flex flex-col justify-evenly items-center'>
                  <Feature title="Hello World" description="This is an example of a feature" className="m-10 hover:shadow-2xl rounded-lg shadow-lg dark:bg-[#161616] duration-200 bg-[#fcfcfc] ">
                    <img src="./svg/commune.svg"/>
                  </Feature>
                </div>
                </div> */}
              </div>
          </div>
        </section>


        <section id="#yellow" className='pt-10'>
          <div className=' p-10'>
            <div className=' mt-10 flex lg:flex-row flex-col items-center justify-center gap-10  dark:bg-[linear-gradient(180deg,#1b1b1d,#fff7a1)] bg-[linear-gradient(180deg,#ffffff,#fff7a1)] rounded-lg shadow-xl'>
                <div>
                  <img src='./gif/cubes/yellow_small.gif' className='w-[200px] h-[200px]  hover:w-[300px] hover:h-[300px] duration-300'></img>
                </div>

                <div className=' flex flex-col justify-evenly items-center'>
                  {/* <h2>Title</h2> */}
                  {/* <Feature title="Hello World" description="This is an example of a feature" className="m-10 hover:shadow-2xl w-full rounded-lg shadow-lg dark:bg-[#161616] duration-200 bg-[#fcfcfc] ">
                    <img src="./svg/commune.svg"/>
                  </Feature> */}
                </div>
              </div>
          </div>
        </section>

        <section id="#red" className='pt-10'>
          <div className=' p-10'>
            <div className=' mt-10 flex lg:flex-row flex-col items-center justify-center gap-10  dark:bg-[linear-gradient(180deg,#1b1b1d,#ff8f8f)] bg-[linear-gradient(180deg,#ffffff,#ff8f8f)] rounded-lg shadow-xl'>
                <div>
                  <img src='./gif/cubes/red_small.gif' className='w-[200px] h-[200px]  hover:w-[300px] hover:h-[300px] duration-300'></img>
                </div>

                <div className=' flex flex-col justify-evenly items-center'>
                  {/* <h2>Title</h2> */}
                  {/* <Feature title="Hello World" description="This is an example of a feature" className="m-10 hover:shadow-2xl w-full rounded-lg shadow-lg dark:bg-[#161616] duration-200 bg-[#fcfcfc] ">
                    <img src="./svg/commune.svg"/>
                  </Feature> */}
                </div>
              </div>
          </div>
        </section>

        <section id="pink" className='pt-10'>
          <div className=' p-10'>
            <div className=' mt-10 flex lg:flex-row flex-col items-center justify-center gap-10  dark:bg-[linear-gradient(180deg,#1b1b1d,#ffd6f5)] bg-[linear-gradient(180deg,#ffffff,#ffd6f5)] rounded-lg shadow-xl'>
                <div>
                  <img src='./gif/cubes/pink_small.gif' className='w-[200px] h-[200px]  hover:w-[300px] hover:h-[300px] duration-300'></img>
                </div>

                <div className=' flex flex-col justify-evenly items-center'>
                  {/* <h2>Title</h2> */}
                  {/* <Feature title="Hello World" description="This is an example of a feature" className="m-10 hover:shadow-2xl w-full rounded-lg shadow-lg dark:bg-[#161616] duration-200 bg-[#fcfcfc] ">
                    <img src="./svg/commune.svg"/>
                  </Feature> */}
                </div>
              </div>
          </div>
        </section>

        <section id="#black" className='pt-10'>
          <div className=' p-10'>
            <div className=' mt-10 flex lg:flex-row flex-col items-center justify-center gap-10  dark:bg-[linear-gradient(180deg,#1b1b1d,#1b1b1d)] bg-[linear-gradient(180deg,#ffffff,#ffffff)] rounded-lg shadow-xl'>
                <div>
                  <img src='./gif/cubes/black_small.gif' className='w-[200px] h-[200px]  hover:w-[300px] hover:h-[300px] duration-300'></img>
                </div>

                <div className=' flex flex-col justify-evenly items-center'>
                  {/* <h2>Title</h2> */}
                  {/* <Feature title="Hello World" description="This is an example of a feature" className="m-10 hover:shadow-2xl w-full rounded-lg shadow-lg dark:bg-[#161616] duration-200 bg-[#fcfcfc] ">
                    <img src="./svg/commune.svg"/>
                  </Feature> */}
                </div>
              </div>
          </div>
        </section>

      </main>
    </Layout>
  );
}
