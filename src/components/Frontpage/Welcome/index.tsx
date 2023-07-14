//import(s)
import React from 'react';

// static data
const cubes = [
  {
    img : {
      src : "./gif/cubes/blue_small.gif",
      className : "lg:w-[200px] lg:h-[200px] lg:hover:w-[300px] lg:hover:h-[300px]  duration-300"
    },
    text : "Networking & Wrapping",
    href : "#blue"
  },
  {
    img : {
      src : "./gif/cubes/green_small.gif",
      className : "lg:w-[200px] lg:h-[200px] lg:hover:w-[300px] lg:hover:h-[300px]  duration-300"
    },
    text : "Reusability",
    href : "#green"
  },
  {
    img : {
      src : "./gif/cubes/yellow_small.gif",
      className : "lg:w-[200px] lg:h-[200px] lg:hover:w-[300px] lg:hover:h-[300px] duration-300"
    },
    text : "Scalability",
    href : "#yellow"
  },
  {
    img : {
      src : "./gif/cubes/red_small.gif",
      className : "lg:w-[200px] lg:h-[200px] lg:hover:w-[300px] lg:hover:h-[300px] duration-300"
    },
    text : "Namespaces",
    href : "#red"
  },
  {
    img : {
      src : "./gif/cubes/pink_small.gif",
      className : "lg:w-[200px] lg:h-[200px] lg:hover:w-[300px] lg:hover:h-[300px]  duration-300"
    },
    text : "Tokenomics",
    href : "#pink"
  },
  {
    img : {
      src : "./gif/cubes/black_small.gif",
      className : "lg:w-[200px] lg:h-[200px] lg:hover:w-[300px] lg:hover:h-[300px]  duration-300"
    },
    text : "Application Validators",
    href : "#black"
  },
  {
    img : {
      src : "./gif/cubes/white_small.gif",
      className : "lg:w-[200px] lg:h-[200px] lg:hover:w-[300px] lg:hover:h-[300px] duration-300"
    },
    text : "Whitepaper 📄",
    href : "#white"
  }
]


// type
type CubeHyperlink = {
  img  : {
    src : string
    className : string
  },
  text : string,
  href : string,
  className? : string
}

// Helper components fn (function(s))
const CubeHyperlink : React.FC<CubeHyperlink> = ({img, text, href, className=""}) => {
  return (              
    <div className={`flex flex-col items-center justify-center text-transparent hover:dark:text-white hover:text-black duration-300 font-sans font-semibold text-lg ${className} `}>
      <a href={href} className='hover:no-underline'> 
        <img src={img.src} className={img.className}></img>
      </a>
      <p>{text}</p>
    </div>)
}


// Main fn
export default function WelcomeSection () {

  return (
    <section id="welcome" className=' h-full pt-20 '>
      <div className='flex flex-col items-center justify-center'>
        <div className='pt-6 w-[710px]'>
          {/* EDIT SUBTEXT  */}
          <h1 className=" text-6xl pb-3 dark:text-white text-center">Welcome to the <span className='text-[#ffb4ed] dark:text-[#FFD6F5] hover:animate-pulse duration-500'>commune</span>! 👋</h1>
          <p className="hero__subtitle text-4xl text-center">A place for <span className='text-[#6db1ff] dark:text-[#6db1ff]'>developers</span>, <span className='text-[#FF8F8F]  dark:text-[#FF8F8F]'>designers</span>, <span className='text-[#ffef40] dark:text-[#FFF7A1]'>creators</span>, <span className='text-[#ffb4ed] dark:text-[#FFD6F5]'>everyone</span>.</p>

        </div>
        
        {/* FIX ME WHEN SMALL SCREEN */}
        <div className='flex flex-row items-center justify-center px-3 gap-0 h-[500px] overflow-auto '>
            {cubes.map((cube) => CubeHyperlink(cube))}
          </div>
      </div>
    </section>
  );
}
