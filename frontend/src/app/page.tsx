'use client';
import classNames from 'classnames';
import HomepageHeader from '@/components/templates/homepage-header';

import classes from "./home.module.css";


function WelcomeSection() {
  return (
    <section id="welcome" className="h-full pt-20">
      <div className="flex flex-col items-center justify-center">
        <div className="pt-6 w-full">
          <h1 className="text-6xl pb-3 dark:text-white text-center">
            Welcome to the{" "}
            <span className="text-[#ffb4ed] dark:text-[#FFD6F5] hover:animate-pulse duration-500">
              commune
            </span>
            ! 👋
          </h1>
          <p className="hero__subtitle text-4xl text-center dark:text-white">
            A place for{" "}
            <span className="text-[#ffb4ed] dark:text-[#FFD6F5]">everyone</span>{" "}
            to{" "}
            <span className="text-[#6db1ff] dark:text-[#6db1ff]">develop</span>,{" "}
            <span className="text-[#FF8F8F]  dark:text-[#FF8F8F]">design</span>,
            and{" "}
            <span className="text-[#ffef40] dark:text-[#FFF7A1]">create</span>.
          </p>
        </div>
        <div className="flex flex-row h-[500px] items-center justify-center px-3 gap-0 overflow-auto">
          <div className="flex flex-col items-center justify-center text-transparent hover:dark:text-white hover:text-black duration-300 font-sans font-semibold text-lg ">
            <a href="#blue" className="hover:no-underline">
              <img
                src="./gif/cubes/blue_small.gif"
                className="lg:w-[200px] lg:h-[200px] lg:hover:w-[300px] lg:hover:h-[300px]  duration-300"
              />
            </a>
            <p>Networking &amp; Wrapping</p>
          </div>
          <div className="flex flex-col items-center justify-center text-transparent hover:dark:text-white hover:text-black duration-300 font-sans font-semibold text-lg ">
            <a href="#green" className="hover:no-underline">
              <img
                src="./gif/cubes/green_small.gif"
                className="lg:w-[200px] lg:h-[200px] lg:hover:w-[300px] lg:hover:h-[300px]  duration-300"
              />
            </a>
            <p>Reusability</p>
          </div>
          <div className="flex flex-col items-center justify-center text-transparent hover:dark:text-white hover:text-black duration-300 font-sans font-semibold text-lg ">
            <a href="#yellow" className="hover:no-underline">
              <img
                src="./gif/cubes/yellow_small.gif"
                className="lg:w-[200px] lg:h-[200px] lg:hover:w-[300px] lg:hover:h-[300px] duration-300"
              />
            </a>
            <p>Scalability</p>
          </div>
          <div className="flex flex-col items-center justify-center text-transparent hover:dark:text-white hover:text-black duration-300 font-sans font-semibold text-lg ">
            <a href="#red" className="hover:no-underline">
              <img
                src="./gif/cubes/red_small.gif"
                className="lg:w-[200px] lg:h-[200px] lg:hover:w-[300px] lg:hover:h-[300px] duration-300"
              />
            </a>
            <p>Namespaces</p>
          </div>
          <div className="flex flex-col items-center justify-center text-transparent hover:dark:text-white hover:text-black duration-300 font-sans font-semibold text-lg ">
            <a href="#pink" className="hover:no-underline">
              <img
                src="./gif/cubes/pink_small.gif"
                className="lg:w-[200px] lg:h-[200px] lg:hover:w-[300px] lg:hover:h-[300px]  duration-300"
              />
            </a>
            <p>Tokenomics</p>
          </div>
          <div className="flex flex-col items-center justify-center text-transparent hover:dark:text-white hover:text-black duration-300 font-sans font-semibold text-lg ">
            <a href="#black" className="hover:no-underline">
              <img
                src="./gif/cubes/black_small.gif"
                className="lg:w-[200px] lg:h-[200px] lg:hover:w-[300px] lg:hover:h-[300px]  duration-300"
              />
            </a>
            <p>Application Validators</p>
          </div>
          <div className="flex flex-col items-center justify-center text-transparent hover:dark:text-white hover:text-black duration-300 font-sans font-semibold text-lg ">
            <a href="#white" className="hover:no-underline">
              <img
                src="./gif/cubes/white_small.gif"
                className="lg:w-[200px] lg:h-[200px] lg:hover:w-[300px] lg:hover:h-[300px] duration-300"
              />
            </a>
            <p>Whitepaper 📄</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionWrapper({
  id,
  imageUrl,
  backgroundClassName,
  children,
}: {
  id: string;
  imageUrl: string;
  backgroundClassName: string;
  children: React.ReactNode;
}) {

  return (
    <div id={id} className=''>
      <div className="py-10 px-5 my-5 ">
        <div className={`${backgroundClassName} mt-10 flex lg:flex-row flex-col items-center justify-center gap-10 rounded-3xl hover-effect w-[95%] mx-auto dark:bg-black`} style={{ boxShadow: `1px 6px 50px 10px ${id}` }}>
          <div className=" flex-none lg:-mr-4 m-10 mt-20">
            <img
              className="w-[200px] h-[200px] duration-300"
              src={imageUrl}
            />
          </div>
          <div className="flex-initial w-full">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className={classNames(classes.main, "flex flex-col ")}>
      <HomepageHeader />
      <WelcomeSection />
      <SectionWrapper
        id="blue"
        imageUrl="./gif/cubes/blue_small.gif"
        backgroundClassName="bg-white"
      >
        <div className=' text-black '>
          <div className='pt-6 text-right w-full pb-10'>
            <h1 className=" text-5xl pt-6 pb-6 text-center dark:text-white">
              Networking & Wrapping <br />Over Everything 🌐
            </h1>
            <div className='flex flex-col space-y-10'>
              <div className=' flex md:flex-row sm:flex-col sm:space-y-4 text-center items-center justify-center'>
                <div className=' my-auto mx-auto w-[30rem] h-[30rem] px-3 '>
                  <img src="./img/frontpage/1.png" className='mt-5 h-[27rem]' />
                </div>
                <div className=' w-[30rem] mx-auto my-auto font-semibold text-lg'>
                  <ul className='text-left list-disc dark:text-white'>
                    <li>Our current economic landscape is characterized by fragmentation, with various sectors and industries operating independently.</li>
                    <li>Developers face challenges in integrating and working across different tools, leading to inefficiencies and time wastage.</li>
                    <li>Lack of interoperability limits innovation and collaboration within the development community</li>
                  </ul>
                </div>
              </div>
              <div className=' flex md:flex-row sm:flex-col sm:space-y-4  text-center '>
                <div className=' w-[30rem] mx-auto my-auto font-semibold text-lg'>
                  <ul className='text-left list-disc dark:text-white'>
                    <li>Commune is a revolutionary protocol that connects developer tools, fostering collaboration, interoperability, and innovation within the development community.</li>
                    <li>Designed to break down barriers and unlock the potential of shared resources, Commune revolutionizes the way developers work and collaborate.</li>
                  </ul>
                </div>
                <div className='my-auto mx-auto'>
                  <img src="./img/frontpage/_5.png" className='my-auto w-[30rem] h-[30rem] p-2' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>
      <SectionWrapper
        id="green"
        imageUrl="./gif/cubes/green_small.gif"
        // backgroundClassName="dark:bg-gradient-to-b from-green-300 to-[#7ceb87] bg-[linear-gradient(180deg,#ffffff,#c3f7c8)]"
        backgroundClassName="bg-white"
      >
        <div className=' text-black mt-10'>
          <div className='pt-6 text-right w-full'>
            <h1 className=" text-5xl pb-3 text-center dark:text-white">Reusability ♻️</h1>


            <div className='flex flex-col text-center space-y-4 items-center justify-center p-10 '>


              <div className=' flex flex-row text-center font-semibold space-x-3 pt-10 py-6 px-5 dark:text-white'>
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
                <div className='w-[35rem] h-[35rem] px-3 '>
                  <img src="./img/frontpage/3.png" className='mt-[7.25rem]' />
                </div>

                <div className=' flex flex-col space-y-2'>
                  <div className='w-[30rem] my-auto px-3 '>
                    <img src="./img/frontpage/4.png" className='py-4' />
                  </div>

                  <div className='w-[30rem] my-auto px-3 '>
                    <img src="./img/frontpage/5.png" className='py-4' />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>
      <SectionWrapper
        id="yellow"
        imageUrl="./gif/cubes/yellow_small.gif"
        // backgroundClassName="dark:dark:bg-gradient-to-b from-yellow-300 to-[#fff7a1] bg-[linear-gradient(180deg,#ffffff,#fff7a1)] rounded-lg shadow-xl"
        backgroundClassName="bg-white"
      >
        <div className=' text-black dark:text-black mt-10'>
          <div className='pt-6 text-right w-full p-10'>

            <h1 className=" text-5xl pb-3 text-center dark:text-white">Scalability ⚖️</h1>

            <div className='flex lg:flex-row md:flex-col sm:flex-col items-center justify-center pb-20 '>

              <div className=' flex flex-col text-center font-semibold space-x-3 pt-10 py-6 px-5 dark:text-white'>

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

              <div className='mx-auto my-auto w-[80%]'>
                <img src="./img/frontpage/9.png" className='mt-5' />
              </div>
            </div>

          </div>
        </div>
      </SectionWrapper>
      <SectionWrapper
        id="red"
        imageUrl="./gif/cubes/red_small.gif"
        // backgroundClassName="dark:bg-gradient-to-b from-red-300 to-[#ff8f8f] bg-[linear-gradient(180deg,#ffffff,#ff8f8f)] rounded-lg shadow-xl"
        backgroundClassName="bg-white"
      >
        <div className=' text-black '>
          <div className='pt-6 text-right w-full'>
            <h1 className=" text-5xl pb-3 text-center dark:text-white">Namespaces 🖥️</h1>

            <div className=' flex flex-col p-10'>

              <div className=' flex flex-row items-center justify-center'>
                <div className=' mx-auto text-center font-semibold  dark:text-white '>
                  <h1> Module Namespaces </h1>
                  <ul className='text-left space-y-4 list-disc'>
                    <li>We do not want to work with IP and ports as it can get confusing.</li>
                    <li>We want to map the name of the module with the endpoint that server is on</li>
                    <ul>
                      <li>Ex: Model → 192.93.39.584:3000</li>
                    </ul>
                  </ul>
                </div>

                <div className='mx-auto my-auto w-[50%]'>
                  <img src="./img/frontpage/8.png" className='mt-5' />
                </div>
              </div>


            </div>
          </div>
        </div>
      </SectionWrapper>
      <SectionWrapper
        id="pink"
        imageUrl="./gif/cubes/pink_small.gif"
        // backgroundClassName="dark:bg-gradient-to-b from-pink-300 to-[#ffd6f5] bg-[linear-gradient(180deg,#ffffff,#ffd6f5)] rounded-lg shadow-xl"
        backgroundClassName="bg-white"
      >
        <div className=' text-black'>
          <div className='pt-6 text-right w-full'>
            <h1 className=" text-5xl pb-3 text-center dark:text-white">Tokenomics 🪙</h1>

            <div className=' flex flex-col text-center space-y-10 font-semibold space-x-3 pt-10 py-6 px-5'>

              <div className=' flex flex-row items-center justify-center'>

                <div className=' mx-auto font-bold dark:text-white'>
                  <h1> Staked Voting </h1>
                  <ul className='text-left space-y-4 list-disc'>
                    <li>The modules will vote on each block at regular intervals.</li>
                    <li>Tokens are allocated per vote every 6 seconds.</li>
                    <li>The module's vote weight is determined by the amount staked on it.</li>
                  </ul>
                </div>

                <div className='w-[30rem] px-3 '>
                  <img src="./img/frontpage/7.1.png" className='mt-5' />
                </div>
              </div>

              <div className=' flex flex-row items-center justify-center'>
                <div className=' mx-auto dark:text-white '>
                  <h1> Rewarding Honest Voters </h1>
                  <ul className='text-left space-y-4 list-disc'>
                    <li>Voters are incentivized to be Honest by Receiving Part of the Reward</li>
                    <li>Half of the incentive that goes to the voted model gets distributed back to the voters based on their vote (stake*weight)</li>
                    <li>This helps ensure honest voting to remove bias</li>
                  </ul>
                </div>

                <div className='w-[30rem] px-3 '>
                  <img src="./img/frontpage/7.2.png" className='mt-5' />
                </div>
              </div>

            </div>

          </div>
        </div>
      </SectionWrapper>
      <SectionWrapper
        id="black"
        imageUrl="./gif/cubes/black_small.gif"
        // backgroundClassName="dark:bg-[#1b1b1d] bg-[#ffffff] rounded-lg shadow-xl"
        backgroundClassName="bg-white"
      >
        <div className=' text-black dark:text-white'>
          <div className='pt-6 text-right w-full dark:text-white'>
            <h1 className=" text-5xl pb-3 dark:text-white text-center">Application Validators ✅</h1>

            <div className='flex flex-col space-y-24 p-10 sm:justify-center sm:items-center '>

              <div className=' flex md:flex-row sm:flex-col sm:space-y-4 text-center items-center justify-center '>
                <div className=' my-auto mx-auto '>
                  <img src="./img/frontpage/6.png" className='my-auto w-[40rem]' />
                </div>
                <div className=' w-[30rem] mx-auto my-auto font-semibold '>
                  <ul className=' text-left space-y-10 list-disc'>
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
      </SectionWrapper>
      <SectionWrapper
        id="white"
        imageUrl="./gif/cubes/white_small.gif"
        // backgroundClassName="dark:bg-[linear-gradient(180deg,#ffffff,#ffffff)] bg-[linear-gradient(180deg,#1b1b1d,#1b1b1d)] rounded-lg shadow-xl"
        backgroundClassName="bg-white"
      >
        <div className='text-black dark:text-white'>
          <div className='pt-6 text-right w-full pb-6 dark:text-white '>

            <h1 className=" text-5xl pb-3 dark:text-white text-center">Read Our Whitepaper 📄</h1>
            <div className='flex flex-col'>
              <div className='flex flex-row md:space-x-20 space-x-10 items-center justify-center '>

                <div>
                  <div className='z-40 absolute bg-gray-100 rounded-lg w-[17rem] h-[17rem] border-2 border-violet-500 border-solid shadow-md px-3 '>
                    <img src="./img/frontpage/commune_network.png" className='mt-5' />
                  </div>
                  <div className=' z-30 mt-5 ml-5 absolute bg-gray-100 rounded-lg w-[17rem] h-[17rem] border-2 border-blue-400 border-solid shadow-md px-3'></div>
                  <div className=' mt-10 ml-10 absolute  bg-gray-100 rounded-lg w-[17rem] h-[17rem] border-2 border-green-400 border-solid shadow-md px-3'></div>
                  <div className=' mt-14 ml-14  bg-gray-100 rounded-lg w-[17rem] h-[17rem] border-2 border-yellow-500 border-solid shadow-xl px-3'></div>
                </div>

                <div className='hidden lg:block xl:block  '>
                  <div className='z-40 absolute bg-gray-100 rounded-lg w-[17rem] h-[17rem] border-2 border-pink-400 border-solid shadow-md px-3 '>
                    <img src="./img/frontpage/without_commune.png" className='mt-5' />
                  </div>
                  <div className=' z-30 mt-5 ml-5 absolute bg-gray-100 rounded-lg w-[17rem] h-[17rem] border-2 border-blue-400 border-solid shadow-md px-3'></div>
                  <div className=' mt-10 ml-10 absolute  bg-gray-100 rounded-lg w-[17rem] h-[17rem] border-2 border-red-400 border-solid shadow-md px-3'></div>
                  <div className=' mt-14 ml-14  bg-gray-100 rounded-lg w-[17rem] h-[17rem] border-2 border-yellow-500 border-solid shadow-xl px-3'></div>
                </div>

              </div>

              <p className=" text-2xl font-semibold text-center mt-10">Want to read more? Check<br />out our whitepaper.</p>
              <div className=' -mt-2 flex justify-center rounded-xl lg:mb-4'>
                <a href='https://ai-secure.github.io/DMLW2022/assets/papers/7.pdf' className=' hover:no-underline '>
                  <div className='flex flex-row bg-[#FF8F8F] hover:bg-[#FF8F8F] dark:bg-[#FF8F8F] dark:hover:bg-[#fc9494] text-white font-bold py-2 px-4 mt-10 rounded-lg shadow-md hover:shadow-xl duration-300 '>
                    <img src="./svg/Drive.svg" className="mr-2 w-7 h-7" />
                    Read Whitepaper
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </main>
  )

}
