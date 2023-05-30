import React from 'react';
import clsx from 'clsx';
// import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Easy to Use',
    description: (
      <>
        Docusaurus was designed from the ground up to be easily installed and
        used to get your website up and running quickly.
      </>
    ),
  },
  {
    title: 'Focus on What Matters',
    
    description: (
      <>
        Docusaurus lets you focus on your docs, and we&apos;ll do the chores. Go
        ahead and move your docs into the <code>docs</code> directory.
      </>
    ),
  },
  {
    title: 'Powered by React',

    description: (
      <>
        Extend or customize your website layout by reusing React. Docusaurus can
        be extended while reusing the same header and footer.
      </>
    ),
  },
];

function Feature({title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className=''>
      <div className='flex flex-col items-center justify-center'>
        <div className='p-6 w-[710px]'>
          <h1 className=" text-6xl pb-3 dark:text-white text-center">Welcome to the <span className='text-[#ffb4ed] dark:text-[#FFD6F5]'>commune</span>!</h1>
          <p className="hero__subtitle text-4xl text-center">A place for <span className='text-[#f8f8f8] dark:text-[#ffffff]'>developers</span>, <span className='text-[#FF8F8F]  dark:text-[#FF8F8F]'>designers</span>, <span className='text-[#ffef40] dark:text-[#FFF7A1]'>creators</span>, <span className='text-[#ffb4ed] dark:text-[#FFD6F5]'>everyone</span>.</p>
          {/* row of gif from the folder ./gif/cubes */}
          <div className=' p-20'>
          <div className='flex flex-row justify-center gap-20'>
            <img src='./gif/cubes/blue_small.gif' className='w-[320px] h-[200px] hover:w-[400px] hover:h-[300px] duration-300'></img>
            <img src='./gif/cubes/green_small.gif' className='w-[320px] h-[200px] hover:w-[400px] hover:h-[300px] duration-300'></img>
            <img src='./gif/cubes/yellow_small.gif' className='w-[320px] h-[200px] hover:w-[400px] hover:h-[300px] duration-300'></img>
            <img src='./gif/cubes/red_small.gif' className='w-[320px] h-[200px] hover:w-[400px] hover:h-[300px] duration-300'></img>
            <img src='./gif/cubes/pink_small.gif' className='w-[320px] h-[200px] hover:w-[400px] hover:h-[300px] duration-300'></img>
            <img src='./gif/cubes/black_small.gif' className='w-[320px] h-[200px] hover:w-[400px] hover:h-[300px] duration-300'/>
          </div>
          </div>
          
          

        </div>
      </div>

      <div className="container flex flex-col">
        <div className='' ></div>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
