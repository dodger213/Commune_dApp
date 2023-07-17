//import(s)
import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import WelcomeSection from '@site/src/components/Frontpage/Welcome/index';
import {getHeaderClasses} from '@site/src/components/utils';
import { Section } from '../components/Frontpage/Sections/index';

// static data
const words : string[] = ["developers.", "designers.", "creators.", "everyone.", "<END>"];
const colour : string[] = ["text-[#00000]", "text-[#ffb4ed] dark:text-[#FFD6F5]", "text-[#FF8F8F]  dark:text-[#FF8F8F]", "text-[#ffef40] dark:text-[#FFF7A1]" ];
const Sections  = [
  {
    id: "blue",
    src : "./gif/cubes/blue_small.gif",
    className : "dark:bg-gradient-to-b from-blue-300 to-[#84b9f7] bg-[linear-gradient(180deg,#ffffff,#84b9f7)] ",
    children : <div className=' text-black '>
                    <div className='pt-6 text-right w-full pb-10'>
                     
                    <h1 className=" text-5xl pt-6 pb-6 text-center">Networking & Wrapping <br/>Over Everything 🌐</h1>
                      <div className='flex flex-col space-y-10'>
                      
                          <div className=' flex md:flex-row sm:flex-col sm:space-y-4 text-center items-center justify-center '>
                            <div className=' my-auto mx-auto z-40 bg-blue-50 rounded-lg w-[30rem] h-[30rem] border-2 border-blue-400 border-solid shadow-md px-3 '>
                              <img src="./img/frontpage/without_commune.png" className='mt-5'/>
                            </div>
                            <div className=' w-[30rem] mx-auto my-auto font-semibold text-lg'>
                              <ul className='text-left'>
                                <li>Our current economic landscape is characterized by fragmentation, with various sectors and industries operating independently.</li>
                                <li>Developers face challenges in integrating and working across different tools, leading to inefficiencies and time wastage.</li>
                                <li>Lack of interoperability limits innovation and collaboration within the development community</li>
                              </ul>


                            </div>
                          </div>

                          {/* <h1 className=" text-5xl sm:text-4xl  text-center">Where does <span className=' text-[#FFD6F5]'>commune</span> fit in? 🤔</h1> */}

                          <div className=' flex md:flex-row sm:flex-col sm:space-y-4  text-center '>
                          

                            <div className=' w-[30rem] mx-auto my-auto font-semibold text-lg'>
                              <ul className=' text-left'>
                                <li>Commune is a revolutionary protocol that connects developer tools, fostering collaboration, interoperability, and innovation within the development community.</li>
                                <li>Designed to break down barriers and unlock the potential of shared resources, Commune revolutionizes the way developers work and collaborate.</li>
                              </ul>

                            </div>
                            
                            <div className=' my-auto mx-auto z-40 bg-blue-50 rounded-lg border-2 border-blue-400 border-solid shadow-md'>
                              <img src="./img/frontpage/commune_network.png" className='my-auto w-[30rem] h-[30rem]'/>
                            </div>
                          </div>

                      </div>

                    </div>
                </div>
  },
  {
    id: "green",
    src : "./gif/cubes/green_small.gif",
    className : "dark:bg-gradient-to-b from-green-300 to-[#7ceb87] bg-[linear-gradient(180deg,#ffffff,#c3f7c8)]",
    children : <div className=' text-black mt-10'>
                      <div className='pt-6 text-right w-full'>
                        <h1 className=" text-5xl pb-3 text-center">Reusability ♻️</h1>
                      
                      
                      <div className='flex flex-col text-center space-y-4 items-center justify-center p-10 '>
                        

                      <div className=' flex flex-row text-center font-semibold space-x-3 pt-10 py-6 px-5'>
                        <div>
                          <h1> Modular Architecture </h1>
                          <ul className='text-left list-decimal space-y-4'>
                            <li>Commune supports a modular architecture that encourages code reuse.</li>
                            <li>Developers can create self-contained modules that can be easily integrated into multiple projects, enhancing scalability and maintainability.</li>
                          </ul>
                        </div>

                        <div>
                          <h1> Modular Sharing </h1>
                          <ul className='text-left list-decimal space-y-4'>
                            <li>Commune facilitates easy sharing and discovery of reusable modules among developers.</li>
                            <li>Developers can contribute their own modules and benefit from the shared pool of resources, saving time and effort.</li>
                          </ul>
                        </div>


                        <div>
                          <h1> Enhanced Efficiency </h1>
                          <ul className='text-left list-decimal space-y-4'>
                            <li>Reusing code and components from the Commune ecosystem reduces development time and effort.</li>
                            <li>Developers can build upon tested and reliable solutions, ensuring consistent quality and accelerating their project timelines.</li>
                          </ul>
                        </div>
                      </div>

                        <div className='flex md:flex-row  flex-col md:space-x-4 sm:items-center sm:justify-center'>
                          <div className='z-40 bg-green-50 rounded-lg w-[35rem] h-[35rem] border-2 border-green-400 border-solid shadow-md px-3 '>
                              <img src="./img/frontpage/_4.png" className='mt-5'/>
                          </div>
                          
                          <div className=' flex flex-col space-y-2'>
                          <div className='z-40 bg-green-50 rounded-lg w-[30rem] my-auto border-2 border-green-400 border-solid shadow-md px-3 '>
                            <img src="./svg/_10.svg" className='mt-5'/>
                          </div>
                        
                          <div className='z-40 bg-green-50 rounded-lg w-[30rem] my-auto border-2 border-green-400 border-solid shadow-md px-3 '>
                              <img src="./img/frontpage/_1.png" className='mt-5'/>
                            </div>
                          </div>
                          </div>
                      </div>

                      

                      </div>
                </div>
  },
  {
    id: "yellow",
    src : "./gif/cubes/yellow_small.gif",
    className : "dark:dark:bg-gradient-to-b from-yellow-300 to-[#fff7a1] bg-[linear-gradient(180deg,#ffffff,#fff7a1)] rounded-lg shadow-xl",
    children : <div className=' text-black dark:text-black mt-10'>
                      <div className='pt-6 text-right w-full p-10'>
                        
                      <h1 className=" text-5xl pb-3 text-center">Scalability ⚖️</h1>

                        <div className='flex lg:flex-row md:flex-col sm:flex-col items-center justify-center pb-20 '>
                        
                        <div className=' flex flex-col text-center font-semibold space-x-3 pt-10 py-6 px-5'>
                        
                        <div>
                          <h1> Horizontal Scaling </h1>
                          <ul className='text-left space-y-4'>
                            <li>Commune supports horizontal scaling, enabling the addition of more resources to handle increased demand.</li>
                            <li>Developers can easily scale up by adding or using more instances or nodes to the Commune network.</li>
                          </ul>
                        </div>

                        <div>
                          <h1> Cloud Agnostic </h1>
                          <ul className='text-left space-y-4'>
                            <li>Commune seamlessly integrates with popular cloud platforms and services.</li>
                            <li>Developers can leverage the scalability and elasticity of cloud resources to accommodate varying workloads.</li>
                          </ul>
                        </div>

                      </div>
                      
                      <div className='z-40 bg-yellow-100/90 rounded-lg w-[30rem] border-2 border-yellow-400 border-solid shadow-md px-3 '>
                            <img src="./img/frontpage/_2.png" className='mt-5'/>
                          </div>
                      </div>
                      
                      </div>
                </div>
  },
  {
    id: "red",
    src : "./gif/cubes/red_small.gif",
    className : "dark:bg-gradient-to-b from-red-300 to-[#ff8f8f] bg-[linear-gradient(180deg,#ffffff,#ff8f8f)] rounded-lg shadow-xl",
    children : <div className=' text-black '>
                      <div className='pt-6 text-right w-full'>  
                        <h1 className=" text-5xl pb-3 text-center">Namespaces 🖥️</h1>

                        <div className=' flex flex-col p-10'>

                        <div className=' flex flex-row items-center justify-center'>
                          <div className=' mx-auto text-center font-semibold  '>
                            <h1> Module Namespaces </h1>
                            <ul className='text-left space-y-4'>
                              <li>We do not want to work with IP and ports as it can get confusing.</li>
                              <li>We want to map the name of the module with the endpoint that server is on</li>
                                <ul>
                                  <li>Ex: Model → 192.93.39.584:3000</li>
                                </ul>
                            </ul>
                          </div>

                          <div className='z-40 bg-red-100 rounded-lg w-[30rem] border-2 border-red-400 border-solid shadow-md px-3 '>
                            <img src="./img/frontpage/_8.png" className='mt-5'/>
                          </div>
                          </div>


                        </div>
                      </div>  
                </div>       
  },
  {
    id: "pink",
    src : "./gif/cubes/pink_small.gif",
    className : "dark:bg-gradient-to-b from-pink-300 to-[#ffd6f5] bg-[linear-gradient(180deg,#ffffff,#ffd6f5)] rounded-lg shadow-xl",
    children : <div className=' text-black'>
                      <div className='pt-6 text-right w-full'>
                        <h1 className=" text-5xl pb-3 text-center">Tokenomics 🪙</h1>

                        <div className=' flex flex-col text-center space-y-10 font-semibold space-x-3 pt-10 py-6 px-5'>
                        
                        <div className=' flex flex-row items-center justify-center'>

                          <div className=' mx-auto font-bold '>
                            <h1> Staked Voting </h1>
                            <ul className='text-left space-y-4 '>
                              <li>The modules will vote on each block at regular intervals.</li>
                              <li>Tokens are allocated per vote every 6 seconds.</li>
                              <li>The module's vote weight is determined by the amount staked on it.</li>
                            </ul>
                          </div>

                          <div className='z-40 bg-pink-50 rounded-lg w-[30rem] border-2 border-pink-400 border-solid shadow-md px-3 '>
                            <img src="./img/frontpage/_6.png" className='mt-5'/>
                          </div>
                        </div>

                        <div className=' flex flex-row items-center justify-center'>
                        <div className=' mx-auto '>
                          <h1> Rewarding Honest Voters </h1>
                          <ul className='text-left space-y-4'>
                            <li>Voters are incentivized to be Honest by Receiving Part of the Reward</li>
                            <li>Half of the incentive that goes to the voted model gets distributed back to the voters based on their vote (stake*weight)</li>
                            <li>This helps ensure honest voting to remove bias</li>
                          </ul>
                        </div>

                        <div className='z-40 bg-pink-50 rounded-lg w-[30rem] border-2 border-pink-400 border-solid shadow-md px-3 '>
                          <img src="./img/frontpage/_7.png" className='mt-5'/>
                        </div>
                        </div>

                      </div>
                      
                      
                      
                      
                      </div>
                </div>
  },
  {
    id: "black",
    src : "./gif/cubes/black_small.gif",
    className : "dark:bg-[#1b1b1d] bg-[#ffffff] rounded-lg shadow-xl",
    children : <div className=' text-black dark:text-white'>
                      <div className='pt-6 text-right w-full'>
                      <h1 className=" text-5xl pb-3 dark:text-white text-center">Application Validators ✅</h1>

                        <div className='flex flex-col space-y-24 p-10 sm:justify-center sm:items-center '>
                          
                          <div className=' flex md:flex-row sm:flex-col sm:space-y-4 text-center items-center justify-center '>
                            <div className=' my-auto mx-auto z-40 bg-gray-100 rounded-lg border-2 border-zinc-700 dark:border-gray-100 border-solid shadow-md '>
                              <img src="./img/frontpage/_3.png" className='mt-5 mx-auto w-[35rem] h-[25rem]'/>
                            </div>
                            <div className=' w-[30rem] mx-auto my-auto font-semibold '>
                                <ul className=' text-left space-y-10'>
                                  <li>Application validators validate modules that best performs that application</li>
                                  <li>Each validator has its own objective and is responsible for calculating an appropriate reward it can vote based on</li>
                                  <li>Validators will need to stake to vote, and the higher staked validators will have more rewards from hosting problems</li>
                                  <li>Modules are rewarded based on their performance with the Validator</li>
                                  
                                </ul>
                            </div>
                          </div>
                      </div>

                      
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
                  <div className='flex flex-col'>
                  
                  
                  <div className='flex flex-row md:space-x-20 space-x-10 items-center justify-center'>
                  
                  <div>
                    <div className='z-40 absolute bg-gray-100 rounded-lg w-[17rem] h-[17rem] border-2 border-violet-500 border-solid shadow-md px-3 '>
                      <img src="./img/frontpage/commune_network.png" className='mt-5'/>
                    </div>
                    <div className=' z-30 mt-5 ml-5 absolute bg-gray-100 rounded-lg w-[17rem] h-[17rem] border-2 border-blue-400 border-solid shadow-md px-3'></div>
                    <div className=' mt-10 ml-10 absolute  bg-gray-100 rounded-lg w-[17rem] h-[17rem] border-2 border-green-400 border-solid shadow-md px-3'></div>
                    <div className=' mt-14 ml-14  bg-gray-100 rounded-lg w-[17rem] h-[17rem] border-2 border-yellow-500 border-solid shadow-xl px-3'></div>
                  </div>

                  <div className='hidden lg:block xl:block  '>
                    <div className='z-40 absolute bg-gray-100 rounded-lg w-[17rem] h-[17rem] border-2 border-pink-400 border-solid shadow-md px-3 '>
                      <img src="./img/frontpage/without_commune.png" className='mt-5'/>
                    </div>
                    <div className=' z-30 mt-5 ml-5 absolute bg-gray-100 rounded-lg w-[17rem] h-[17rem] border-2 border-blue-400 border-solid shadow-md px-3'></div>
                    <div className=' mt-10 ml-10 absolute  bg-gray-100 rounded-lg w-[17rem] h-[17rem] border-2 border-red-400 border-solid shadow-md px-3'></div>
                    <div className=' mt-14 ml-14  bg-gray-100 rounded-lg w-[17rem] h-[17rem] border-2 border-yellow-500 border-solid shadow-xl px-3'></div>
                  </div>

                    
                </div>
                  
                <p className=" text-2xl font-semibold text-center mt-10">Want to read more? Check<br/>out our whitepaper.</p>
                <div className=' -mt-2 flex justify-center rounded-xl lg:mb-4'>
                    <a href='https://ai-secure.github.io/DMLW2022/assets/papers/7.pdf' className=' hover:no-underline '>
                      <div className=' flex flex-row bg-[#FF8F8F] hover:bg-[#FF8F8F] dark:bg-[#FF8F8F] dark:hover:bg-[#fc9494] text-white font-bold py-2 px-4 mt-10 rounded-lg shadow-md hover:shadow-xl duration-300 '>
                        <img src="./svg/Drive.svg" className="mr-2 w-7 h-7" /> 
                        Read Whitepaper
                      </div>
                    </a>
                  </div>
                  </div>
                </div>
              </div>
              
  }  
];

// type
// --None--

// Helper components fn (function(s))
function HomepageHeader() : JSX.Element {

  
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

<img src="gif/logo/CubesShufflingGIF.gif" alt="Commune Logo" className='block sm:hidden'/>  
      <div className="px-10 py-5">
        <div className='flex lg:flex-row flex-col h-1/2'>
        <div className='w-full lg:w-1/2 flex flex-col items-center justify-center'>
          
          <div className=' w-auto sm:w-[710px] sm:h-[250px] '>
            <h1 className=" text-4xl sm:text-6xl sm:pb-3 dark:text-white">{siteConfig.title}</h1>
            <div className='hidden sm:block'>
              <p className="hero__subtitle text-xl sm:text-4xl">{siteConfig.tagline}
              <br />
              <span className={`hero__subtitle text-4xl ${colour[index]} font-semibold mb-5`}>{`${words[index].substring(0, subIndex)}${blink ? "|" : ""}`}</span></p>
            </div>
          </div>
          
          <div className='w-30 h-10'>
          <a href="docs/next/Introduction" className=' hover:no-underline' >
              <div className=' bg-blue-700 rounded-lg shadow-lg hover:shadow-2xl text-center hover:bg-blue-600 duration-200 text-white hover:text-white font-sans font-semibold justify-center px-2 py-2 hover:border-blue-300 hover:border-2 hover:border-solid' >
                Get Started
              </div>
            </a>
          </div>

        </div>


        <div className='hidden sm:block w-full lg:w-[75%] h-full lg:-mr-44 '>
          <img src="gif/logo/CubesShufflingGIF.gif" alt="Commune Logo" className=''/>  
        </div>


      </div>
      </div>

    </header>
  );
}



export default function Home() {

  return (
    <Layout
      title={`Home`}
      description="commune ai home page">
      <main>
        <HomepageHeader />
        <div className='hidden sm:block md:block lg:block xl:block'>
        <WelcomeSection />
        {Sections.map((section) => {
          return (
            <Section id={section.id} src={section.src} className={section.className}>
              {section.children}
            </Section>
          )
        })}
      </div>
      </main>
    </Layout>
  );
}
