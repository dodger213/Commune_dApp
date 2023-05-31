import React from 'react';


export default function WelcomeSection() {

  


  return (
    <section id="welcome" className=' h-full pt-20 '>
      <div className='flex flex-col items-center justify-center'>
        
        <div className='pt-6 w-[710px]'>
          {/* EDIT SUBTEXT  */}
          <h1 className=" text-6xl pb-3 dark:text-white text-center">Welcome to the <span className='text-[#ffb4ed] dark:text-[#FFD6F5] hover:animate-pulse duration-500'>commune</span>! 👋</h1>
          <p className="hero__subtitle text-4xl text-center">A place for <span className='text-[#6db1ff] dark:text-[#6db1ff]'>developers</span>, <span className='text-[#FF8F8F]  dark:text-[#FF8F8F]'>designers</span>, <span className='text-[#ffef40] dark:text-[#FFF7A1]'>creators</span>, <span className='text-[#ffb4ed] dark:text-[#FFD6F5]'>everyone</span>.</p>

        </div>
        
        {/* FIX ME WHEN SMALL SCREEN */}
        <div className='flex lg:flex-row flex-col items-center justify-center px-4 gap-0 h-[500px] overflow-auto '>
            <a href="#blue" className='dark:text-white text-black hover:text-black hover:no-underline'> 
              <div className='flex  flex-col items-center justify-center '>
                <img src='./gif/cubes/blue_small.gif' className='w-[200px] h-[200px] hover:w-[300px] hover:h-[300px] duration-300'></img>
                <div>ENTER TEXT</div>
              </div>
            </a>

            <a href="#green" className=' dark:text-white text-black hover:text-black  hover:no-underline'> 
            <div className='flex flex-col items-center justify-center'>
              <img src='./gif/cubes/green_small.gif' className='w-[200px] h-[200px] hover:w-[300px] hover:h-[300px] duration-300'></img>
              <div>ENTER EXT</div>
            </div>
            </a>

            <a href="#yellow" className=' dark:text-white text-black hover:text-black  hover:no-underline'>
              <div className='flex flex-col items-center justify-center'>
                <img src='./gif/cubes/yellow_small.gif' className='w-[200px] h-[200px] hover:w-[300px] hover:h-[300px] duration-300'></img>
                <div>ENTER TEXT</div>
              </div>
            </a>
            
            <a href="#red" className=' dark:text-white text-black hover:text-black  hover:no-underline'>
              <div className='flex flex-col items-center justify-center'>
                <img src='./gif/cubes/red_small.gif' className='w-[200px] h-[200px] hover:w-[300px] hover:h-[300px] duration-300'></img>
                <div>ENTER TEXT</div>
              </div>
            </a>

            <a href="#pink" className=' dark:text-white text-black hover:text-black  hover:no-underline'>
              <div className='flex flex-col items-center justify-center'>
                <img src='./gif/cubes/pink_small.gif' className='w-[200px] h-[200px] hover:w-[300px] hover:h-[300px] duration-300'></img>
                <div>ENTER TEXT</div>
              </div>
            </a>

            <a href="#black" className=' dark:text-white text-black hover:text-black  hover:no-underline'>
            <div className='flex flex-col items-center justify-center'>
              <img src='./gif/cubes/black_small.gif' className='w-[200px] h-[200px] hover:w-[300px] hover:h-[300px] duration-300'></img>
              <div>ENTER TEXT</div>
            </div>
            </a>

            <a href="#white" className=' dark:text-white text-black hover:text-black  hover:no-underline'>
              <div className='flex flex-col items-center justify-center'>
                <img src='./gif/cubes/white_small.gif' className='w-[200px] h-[200px] hover:w-[300px] hover:h-[300px] duration-300'></img>
                <div className=' font-semibold'>Whitepaper 📄</div>
              </div>
            </a>
          </div>
      </div>

       
    </section>
  );
}
