'use client';
import classNames from 'classnames';
import Image from 'next/image';
import classes from "./home.module.css";
import HomepageHeader from '@/components/templates/homepage-header';
import WelcomeSection from '@/components/templates/welcome/welcome';

function SectionWrapper({
  imageUrl,
  backgroundClassName,
  children,
}: {
  imageUrl: string;
  backgroundClassName: string;
  children: React.ReactNode;
}) {

  return (
    <div>
      <div className="">
        <div className={`
            ${backgroundClassName} flex lg:flex-row flex-col items-center 
            justify-center hover-effect w-[100%] lg:mx-auto 
            dark:bg-gray-900
          `} 
        >
          <div className=" flex-none lg:-mr-4 m-10 mt-20">
            <Image
              alt='Image'
              className="w-[200px] h-[200px] duration-300"
              src={imageUrl}
              width={200}
              height={200}
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
        imageUrl="/gif/cubes/commune-single-block_blue.gif"
        backgroundClassName="bg-white dark:bg-gray-900"
      >
        <div className='text-black'>
          <div className='text-right w-full pb-10'>
            <h1 className="text-4xl md:text-5xl lg:text-6xl py-10 md:py-15 lg:py-20 px-3 text-center dark:text-white">
              Networking & Wrapping <br />Over Everything 🌐
            </h1>
            <div className='flex flex-col space-y-10'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-5 text-center items-center justify-center px-2'>
                <div className='my-auto mx-auto'>
                  <Image src="/img/frontpage/1.png" className='my-auto w-[100%] md:w-[30rem] p-1 rounded-md' alt='Image' width={480}
                    height={480} />
                </div>
                <div className='w-[100%] md:w-[30rem] mx-auto font-semibold text-xl md:text-2xl'>
                  <ul className='text-left list-disc dark:text-white'>
                    <li>Our current economic landscape is characterized by fragmentation, with various sectors and industries operating independently.</li>
                    <li>Developers face challenges in integrating and working across different tools, leading to inefficiencies and time wastage.</li>
                    <li>Lack of interoperability limits innovation and collaboration within the development community</li>
                  </ul>
                </div>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-1 text-center items-center justify-center px-1'>
                <div className='w-[100%] md:w-[30rem] mx-auto font-semibold text-xl md:text-2xl'>
                  <ul className='text-left list-disc dark:text-white'>
                    <li>Commune is a revolutionary protocol that connects developer tools, fostering collaboration, interoperability, and innovation within the development community.</li>
                    <li>Designed to break down barriers and unlock the potential of shared resources, Commune revolutionizes the way developers work and collaborate.</li>
                  </ul>
                </div>
                <div className='my-auto mx-auto'>
                  <Image src="/img/frontpage/_5.png" className='my-auto w-[100%] md:w-[30rem] p-2 rounded-md' alt='Image' width={480}
                    height={480} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>
      <SectionWrapper
        imageUrl="/gif/cubes/commune-single-block_green.gif"
        backgroundClassName="bg-white dark:bg-gray-800"
      >
        <div className='text-black'>
          <div className='text-right w-full pb-10'>
            <h1 className="text-4xl md:text-5xl lg:text-6xl py-10 md:py-15 lg:py-20 px-3 text-center dark:text-white">Reusability ♻️</h1>
            <div className='flex flex-col text-center space-y-4 items-center justify-center px-1'>
              <div className='grid grid-row md:grid-cols-3 gap-1 text-center font-semibold dark:text-white'>
                <div>
                  <h1 className="text-3xl"> Modular Architecture </h1>
                  <ul className='text-left list-disc space-y-4 text-xl md:text-2xl'>
                    <li>Commune supports a modular architecture that encourages code reuse.</li>
                    <li>Developers can create self-contained modules that can be easily integrated into multiple projects, enhancing scalability and maintainability.</li>
                  </ul>
                </div>
                <div>
                  <h1 className="text-3xl"> Modular Sharing </h1>
                  <ul className='text-left list-disc space-y-4 text-xl md:text-2xl'>
                    <li>Commune facilitates easy sharing and discovery of reusable modules among developers.</li>
                    <li>Developers can contribute their own modules and benefit from the shared pool of resources, saving time and effort.</li>
                  </ul>
                </div>
                <div>
                  <h1 className="text-3xl"> Enhanced Efficiency </h1>
                  <ul className='text-left list-disc space-y-4 text-xl md:text-2xl'>
                    <li>Reusing code and components from the Commune ecosystem reduces development time and effort.</li>
                    <li>Developers can build upon tested and reliable solutions, ensuring consistent quality and accelerating their project timelines.</li>
                  </ul>
                </div>
              </div>
              <div className='flex md:flex-row  flex-col gap-2 lg:gap-10 md:space-x-4 items-center justify-center px-1'>
                <div className='w-[100%] md:w-[35rem]'>
                  <Image src="/img/frontpage/3.png" alt='Image' width={560}
                    height={560} />
                </div>
                <div className='flex flex-col space-y-2'>
                  <div className='w-[100%] md:w-[35rem] my-auto'>
                    <Image src="/img/frontpage/4.png" className='py-4' alt='Image' width={560}
                    height={560} />
                  </div>
                  <div className='w-[100%] md:w-[35rem]'>
                    <Image src="/img/frontpage/5.png" alt='Image' width={560}
                    height={560} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>
      <SectionWrapper

        imageUrl="/gif/cubes/commune-single-block_yellow.gif"

        backgroundClassName="bg-white"
      >
        <div className='text-black'>
          <div className='text-right w-full pb-10'>
            <h1 className="text-4xl md:text-5xl lg:text-6xl py-10 md:py-15 lg:py-20 px-3 text-center dark:text-white">Scalability ⚖️</h1>
            <div className='flex md:flex-row flex-col gap-2 items-center justify-center px-1'>
              <div className='flex flex-col text-center font-semibold dark:text-white'>
                <div>
                  <h1 className="text-3xl"> Horizontal Scaling </h1>
                  <ul className='text-left list-disc space-y-4 text-xl md:text-2xl'>
                    <li>Commune supports horizontal scaling, enabling the addition of more resources to handle increased demand.</li>
                    <li>Developers can easily scale up by adding or using more instances or nodes to the Commune network.</li>
                  </ul>
                </div>
                <div>
                  <h1 className="text-3xl"> Cloud Agnostic </h1>
                  <ul className='text-left list-disc space-y-4 text-xl md:text-2xl'>
                    <li>Commune seamlessly integrates with popular cloud platforms and services.</li>
                    <li>Developers can leverage the scalability and elasticity of cloud resources to accommodate varying workloads.</li>
                  </ul>
                </div>
              </div>
              <div className='w-[100%] px-1 py-4'>
                <Image src="/img/frontpage/9.png" alt='Image' width={600}
                  height={600} />
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>
      <SectionWrapper
        imageUrl="/gif/cubes/commune-single-block_red.gif"
        backgroundClassName="bg-white dark:bg-gray-800"
      >
        <div className='text-black '>
          <div className='text-right w-full pb-10'>
            <h1 className="text-4xl md:text-5xl lg:text-6xl py-10 md:py-15 lg:py-20 px-3 text-center dark:text-white">Namespaces 🖥️</h1>
            <div className='flex md:flex-row flex-col gap-2 items-center justify-center px-1'>
              <div className='flex flex-col text-center font-semibold dark:text-white '>
                <h1 className="text-3xl"> Module Namespaces </h1>
                <ul className='text-left list-disc space-y-4 text-xl md:text-2xl'>
                  <li>We do not want to work with IP and ports as it can get confusing.</li>
                  <li>We want to map the name of the module with the endpoint that server is on</li>
                  <ul>
                    <li>Ex: Model → 192.93.39.584:3000</li>
                  </ul>
                </ul>
              </div>
              <div className='w-[100%] md:w-[70%] px-1 py-3'>
                <Image src="/img/frontpage/8.png" alt='Image' width={600}
                  height={600} />
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>
      <SectionWrapper
        imageUrl="/gif/cubes/commune-single-block_purple.gif"
        backgroundClassName="bg-white"
      >
        <div className=' text-black'>
          <div className='text-right w-full pb-10'>
            <h1 className="text-4xl md:text-5xl lg:text-6xl py-10 md:py-15 lg:py-20 px-3 text-center dark:text-white">Tokenomics 📊</h1>
            <div className='flex flex-col space-y-10'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-5 text-center items-center justify-center px-2'>
                <div className=' mx-auto font-bold dark:text-white'>
                  <h1 className="text-3xl"> Staked Voting </h1>
                  <ul className='text-left list-disc space-y-4 text-xl md:text-2xl'>
                    <li>The modules will vote on each block at regular intervals.</li>
                    <li>Tokens are allocated per vote every 6 seconds.</li>
                    <li>The module `&apos;`s vote weight is determined by the amount staked on it.</li>
                  </ul>
                </div>
                <div className='w-[100%] lg:w-[70%] mx-auto px-1 py-3'>
                  <Image src="/img/frontpage/7.1.png" alt='Image' width={500}
                    height={300} />
                </div>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-5 text-center items-center justify-center px-2'>
                <div className='mx-auto dark:text-white'>
                  <h1 className="text-3xl"> Rewarding Honest Voters </h1>
                  <ul className='text-left list-disc space-y-4 text-xl md:text-2xl'>
                    <li>Voters are incentivized to be Honest by Receiving Part of the Reward</li>
                    <li>Half of the incentive that goes to the voted model gets distributed back to the voters based on their vote (stake*weight)</li>
                    <li>This helps ensure honest voting to remove bias</li>
                  </ul>
                </div>
                <div className='w-[100%] lg:w-[70%] mx-auto px-1 py-3'>
                  <Image src="/img/frontpage/7.2.png" alt='image' width={500}
                    height={300} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>
      <SectionWrapper
        imageUrl="/gif/cubes/commune-single-block_gray.gif"
        backgroundClassName="bg-white dark:bg-gray-800"
      >
        <div className=' text-black dark:text-white'>
          <div className='text-right w-full pb-10'>
            <h1 className="text-4xl md:text-5xl lg:text-6xl py-10 md:py-15 lg:py-20 px-3 text-center dark:text-white">Application Validators ✅</h1>
            <div className='flex flex-col space-y-10'>
              <div className='flex md:flex-row flex-col gap-2 items-center justify-center px-1'>
                <div className='w-[100%] lg:w-[70%] mx-auto px-4 py-3'>
                  <Image src="/img/frontpage/6.png" alt='Image' width={500}
                    height={300} />
                </div>
                <div className='mx-auto dark:text-white'>
                  <ul className='text-left list-disc space-y-4 text-xl md:text-2xl'>
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
        imageUrl="/gif/cubes/commune-single-block_white.gif"
        backgroundClassName="bg-white"
      >
        <div className='text-black dark:text-white'>
          <div className='text-right w-full pb-10'>
            <h1 className="text-4xl md:text-5xl lg:text-6xl py-10 md:py-15 lg:py-20 px-3 text-center dark:text-white">Read Our Whitepaper 📄</h1>
            <div className='flex flex-col'>
              <div className='flex flex-row md:space-x-20 space-x-10 items-center justify-center '>
                <div>
                  <div className='z-40 absolute bg-gray-100 rounded-lg w-[17rem] h-[17rem] border-2 border-violet-500 border-solid shadow-md px-3 '>
                    <Image src="/img/frontpage/commune_network.png" className='mt-5' alt='Image' width={272}
                      height={272} />
                  </div>
                  <div className=' z-30 mt-5 ml-5 absolute bg-gray-100 rounded-lg w-[17rem] h-[17rem] border-2 border-blue-400 border-solid shadow-md px-3' />
                  <div className=' mt-10 ml-10 absolute  bg-gray-100 rounded-lg w-[17rem] h-[17rem] border-2 border-green-400 border-solid shadow-md px-3' />
                  <div className=' mt-14 ml-14  bg-gray-100 rounded-lg w-[17rem] h-[17rem] border-2 border-yellow-500 border-solid shadow-xl px-3' />
                </div>
                <div className='hidden lg:block xl:block'>
                  <div className='z-40 absolute bg-gray-100 rounded-lg w-[17rem] h-[17rem] border-2 border-pink-400 border-solid shadow-md px-3 '>
                    <Image src="/img/frontpage/without_commune.png" className='mt-5' alt='Image' width={272}
                      height={272} />
                  </div>
                  <div className=' z-30 mt-5 ml-5 absolute bg-gray-100 rounded-lg w-[17rem] h-[17rem] border-2 border-blue-400 border-solid shadow-md px-3' />
                  <div className=' mt-10 ml-10 absolute  bg-gray-100 rounded-lg w-[17rem] h-[17rem] border-2 border-red-400 border-solid shadow-md px-3' />
                  <div className=' mt-14 ml-14  bg-gray-100 rounded-lg w-[17rem] h-[17rem] border-2 border-yellow-500 border-solid shadow-xl px-3' />
                </div>
              </div>
              <p className="text-2xl font-semibold text-center mt-10">Want to read more? Check<br />out our whitepaper.</p>
              <div className='flex justify-center rounded-xl lg:mb-4'>
                <a href='https://ai-secure.github.io/DMLW2022/assets/papers/7.pdf' className='hover:no-underline '>
                  <div className='w-[15rem] h-[3rem] flex flex-row gap-2 bg-[#FF8F8F] hover:bg-[#FF8F8F] dark:bg-[#FF8F8F] dark:hover:bg-[#fc9494] text-white text-xl font-bold py-2 px-4 mt-10 rounded-lg shadow-md hover:shadow-xl duration-300 '>
                    <Image src="/svg/Drive.svg" className="mr-2 w-7 h-7" alt='Image' width={272}
                      height={272} />
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
