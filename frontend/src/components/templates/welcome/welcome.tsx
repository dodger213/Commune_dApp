import Image from "next/image";

export default function WelcomeSection() {
    return (
      <section id="welcome" className="h-full pt-20 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center">
          <div className="pt-6 w-full">
            <h1 className="text-6xl pb-3 dark:text-white text-center">
              Welcome to the{" "}
              <span className="text-[#ffb4ed] dark:text-[#FFD6F5] hover:animate-pulse duration-500">
                commune
              </span>
              ! 
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
          <div className="grid grid-cols-7 sm:h-[300px] lg:h-[500px] items-center justify-center px-3 gap-0">
            <div className="flex flex-col items-center justify-center text-transparent hover:dark:text-white hover:text-black duration-300 font-sans font-semibold text-lg">
              <a href="#blue" className="hover:no-underline">
                <Image
                  src="/gif/cubes/commune-single-block_blue.webp"
                  className="w-[7rem] h-[7rem] md:w-[10rem] md:h-[10rem] lg:w-[15rem] lg:h-[15rem] hover:w-[20rem] hover:h-[19rem] duration-300"
                  alt='Image'
                  width={30}
                  height={30}
                />
              </a>
              <p>Networking &amp; Wrapping</p>
            </div>
            <div className="flex flex-col items-center justify-center text-transparent hover:dark:text-white hover:text-black duration-300 font-sans font-semibold text-lg">
              <a href="#green" className="hover:no-underline">
                <Image
                  src="/gif/cubes/commune-single-block_green.webp"
                  alt='Image'
                  className="w-[7rem] h-[7rem] md:w-[10rem] md:h-[10rem] lg:w-[15rem] lg:h-[15rem] hover:w-[20rem] hover:h-[19rem] duration-300"
                  width={30}
                  height={30}
                />
              </a>
              <p>Reusability</p>
            </div>
            <div className="flex flex-col items-center justify-center text-transparent hover:dark:text-white hover:text-black duration-300 font-sans font-semibold text-lg">
              <a href="#yellow" className="hover:no-underline">
                <Image
                  src="/gif/cubes/commune-single-block_yellow.webp"
                  alt='Image'
                  className="w-[7rem] h-[7rem] md:w-[10rem] md:h-[10rem] lg:w-[15rem] lg:h-[15rem] hover:w-[20rem] hover:h-[19rem] duration-300"
                  width={30}
                  height={30}
                />
              </a>
              <p>Scalability</p>
            </div>
            <div className="flex flex-col items-center justify-center text-transparent hover:dark:text-white hover:text-black duration-300 font-sans font-semibold text-lg">
              <a href="#red" className="hover:no-underline">
                <Image
                  alt='Image'
                  src="/gif/cubes/commune-single-block_red.webp"
                  className="w-[7rem] h-[7rem] md:w-[10rem] md:h-[10rem] lg:w-[15rem] lg:h-[15rem] hover:w-[20rem] hover:h-[19rem] duration-300"
                  width={30}
                  height={30}
                />
              </a>
              <p>Namespaces</p>
            </div>
            <div className="flex flex-col items-center justify-center text-transparent hover:dark:text-white hover:text-black duration-300 font-sans font-semibold text-lg">
              <a href="#pink" className="hover:no-underline">
                <Image
                  alt='Image'
                  src="/gif/cubes/commune-single-block_purple.webp"
                  className="w-[7rem] h-[7rem] md:w-[10rem] md:h-[10rem] lg:w-[15rem] lg:h-[15rem] hover:w-[20rem] hover:h-[19rem] duration-300"
                  width={30}
                  height={30}
                />
              </a>
              <p>Tokenomics</p>
            </div>
            <div className="flex flex-col items-center justify-center text-transparent hover:dark:text-white hover:text-black duration-300 font-sans font-semibold text-lg">
              <a href="#black" className="hover:no-underline">
                <Image
                  alt='Image'
                  src="/gif/cubes/commune-single-block_gray.webp"
                  className="w-[7rem] h-[7rem] md:w-[10rem] md:h-[10rem] lg:w-[15rem] lg:h-[15rem] hover:w-[20rem] hover:h-[19rem] duration-300"
                  width={30}
                  height={30}
                />
              </a>
              <p>Application Validators</p>
            </div>
            <div className="flex flex-col items-center justify-center text-transparent hover:dark:text-white hover:text-black duration-300 font-sans font-semibold text-lg">
              <a href="#white" className="hover:no-underline">
                <Image
                  alt='Image'
                  src="/gif/cubes/commune-single-block_white.webp"
                  className="w-[7rem] h-[7rem] md:w-[10rem] md:h-[10rem] lg:w-[15rem] lg:h-[15rem] hover:w-[20rem] hover:h-[19rem] duration-300"
                  width={30}
                  height={30}
                />
              </a>
              <p>Whitepaper 📄</p>
            </div>
          </div>
        </div>
      </section>
    );
  }