import React from 'react';
// import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import WelcomeSection from '@site/src/components/Frontpage/Welcome/index';
import {getHeaderClasses} from '@site/src/components/utils';
import { Section } from '../components/Frontpage/Sections/index';
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
          <div className='p-6 w-[710px] h-[250px]'>
            <h1 className=" text-6xl pb-3 dark:text-white">{siteConfig.title}</h1>
            <p className="hero__subtitle text-4xl">{siteConfig.tagline}
            <br/>
            <span className={`hero__subtitle text-4xl ${colour[index]} font-semibold mb-5`}>{`${words[index].substring(0, subIndex)}${blink ? "|" : ""}`}</span></p>
            
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

const Sections  = [
  {
    id: "blue",
    src : "./gif/cubes/blue_small.gif",
    className : "dark:bg-[linear-gradient(180deg,#1b1b1d,#84b9f7)] bg-[linear-gradient(180deg,#ffffff,#84b9f7)]",
    children : <div className=' text-black dark:text-white'>
                      <div className='pt-6 text-right w-full'>
                        <h1 className=" text-5xl pb-3 dark:text-white text-center">ENTER TEXT HERE</h1>
                      </div>
                </div>
  },
  {
    id: "green",
    src : "./gif/cubes/green_small.gif",
    className : "dark:bg-[linear-gradient(180deg,#1b1b1d,#c3f7c8)] bg-[linear-gradient(180deg,#ffffff,#c3f7c8)]",
    children : <div className=' text-black dark:text-white'>
                      <div className='pt-6 text-right w-full'>
                        <h1 className=" text-5xl pb-3 dark:text-white text-center">ENTER TEXT HERE</h1>
                      </div>
                </div>
  },
  {
    id: "yellow",
    src : "./gif/cubes/yellow_small.gif",
    className : "dark:bg-[linear-gradient(180deg,#1b1b1d,#fff7a1)] bg-[linear-gradient(180deg,#ffffff,#fff7a1)] rounded-lg shadow-xl",
    children : <div className=' text-black dark:text-white'>
                      <div className='pt-6 text-right w-full'>
                        <h1 className=" text-5xl pb-3 dark:text-white text-center">ENTER TEXT HERE</h1>
                      </div>
                </div>
  },
  {
    id: "red",
    src : "./gif/cubes/red_small.gif",
    className : "dark:bg-[linear-gradient(180deg,#1b1b1d,#ff8f8f)] bg-[linear-gradient(180deg,#ffffff,#ff8f8f)] rounded-lg shadow-xl",
    children : <div className=' text-black dark:text-white'>
                      <div className='pt-6 text-right w-full'>  
                        <h1 className=" text-5xl pb-3 dark:text-white text-center">ENTER TEXT HERE</h1>
                      </div>  
                </div>       
  },
  {
    id: "pink",
    src : "./gif/cubes/pink_small.gif",
    className : "dark:bg-[linear-gradient(180deg,#1b1b1d,#ffd6f5)] bg-[linear-gradient(180deg,#ffffff,#ffd6f5)] rounded-lg shadow-xl",
    children : <div className=' text-black dark:text-white'>
                      <div className='pt-6 text-right w-full'>
                        <h1 className=" text-5xl pb-3 dark:text-white text-center">ENTER TEXT HERE</h1>
                      </div>
                </div>
  },
  {
    id: "black",
    src : "./gif/cubes/black_small.gif",
    className : "dark:bg-[linear-gradient(180deg,#1b1b1d,#1b1b1d)] bg-[linear-gradient(180deg,#ffffff,#ffffff)] rounded-lg shadow-xl",
    children : <div className=' text-black dark:text-white'>
                      <div className='pt-6 text-right w-full'>
                        <h1 className=" text-5xl pb-3 dark:text-white text-center">ENTER TEXT HERE</h1>
                      </div>
                </div>
  },
  {
    id: "white",
    src : "./gif/cubes/white_small.gif",
    className : "dark:bg-[linear-gradient(180deg,#ffffff,#ffffff)] bg-[linear-gradient(180deg,#1b1b1d,#1b1b1d)] rounded-lg shadow-xl",
    children : <div className=' text-white dark:text-black'>
                <div className='pt-6 text-right w-full pb-6'>
                  <h1 className=" text-5xl pb-3 dark:text-black text-center">Read Our Whitepaper 📄</h1>
                  <p className="hero__subtitle text-3xl text-center">Want to read more? Check<br/>out the our whitepaper.</p>

                  <div className='flex justify-center rounded-xl lg:mb-4'>
                    <a href='' className=' hover:no-underline '>
                      <div className=' flex flex-row bg-[#FF8F8F] hover:bg-[#FF8F8F] dark:bg-[#FF8F8F] dark:hover:bg-[#fc9494] text-white font-bold py-2 px-4 mt-10 rounded-lg shadow-md hover:shadow-xl duration-300 '>
                        <img src="./svg/Drive.svg" className="mr-2 w-7 h-7" /> 
                        Read Whitepaper
                      </div>
                    </a>
                  </div>
                  
                </div>
              </div>
  }  
]


export default function Home() {

  return (
    <Layout
      title={`Home`}
      description="Description will go into a meta tag in <head />">
      <main>
        <HomepageHeader />
        <WelcomeSection />
        {Sections.map((section) => {
          return (
            <Section id={section.id} src={section.src} className={section.className}>
              {section.children}
            </Section>
          )
        })}

      </main>
    </Layout>
  );
}
