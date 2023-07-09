import React, { useState } from 'react';
import Layout from '@theme/Layout';
// import ExtraSidebar from '../components/Modules/components/SideBarComponent/index';
import '../css/global.css';




export default function Modules() {


  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)
  const isStreamUp = (target : string, times : number, delay : number) =>{ 
    return new Promise((res, rej) => {
            (function rec(i) {
              fetch(target, {mode : 'no-cors'}).then((r) => {
                res(r)
              }).catch(err => {
                  if (times === 0)
                    return rej(err)

                  setTimeout(() => rec(--times), delay)
              })
            })(times);
          }) 
  }

  isStreamUp("http://localhost:8501/?embed=true", 3, 1000)
  .then( res => {
    setLoaded(true)
  }).catch( err => {
    setError(true)
  })
  return (
    <Layout dark-theme="dark" title={`🚀 Modules`}>
      <div className='text-lg dark:text-white text-black '>
        <div className='flex flex-col items-center justify-center'>
        {(!loaded && !error) && (<><h1 className='text-4xl font-bold'>
          <span className='text-[#ffb4ed] dark:text-[#FFD6F5] hover:animate-pulse duration-500'>
          commune
        </span>::Modules 🚀
        </h1>
        <img src="./gif/cubes/MultiColourCubeSpin.gif" className='w-[500px] h-[300px]' />
        <p className='text-xl font-medium'>Building... 🚧 🏗️</p> 
        </>)}
        {error && (
          <><h1 className='text-4xl font-bold'>
          <span className='text-[#ffb4ed] dark:text-[#FFD6F5] hover:animate-pulse duration-500'>
          commune
        </span>::Modules 🚀
        </h1>
        <img src="./gif/cubes/MultiColourCubeSpin.gif" className='w-[500px] h-[300px]' />
        <p className='text-xl font-medium'>something went wrong... ❌</p> 
        </>
        )}
        { loaded && (
          <iframe
            className='w-screen h-screen'
            src='http://localhost:8501/?embed=true'  // Replace with the URL of the desired iframe content
            title='Embedded Content'
        ></iframe>
        )}
          <div className='fixed z-10 flex flex-col items-center justify-center rounded-lg mt-10'>
           
          </div>
        </div>
      </div>

    </Layout>
  );
}

{/* <h1 className='text-4xl font-bold'>
<span className='text-[#ffb4ed] dark:text-[#FFD6F5] hover:animate-pulse duration-500'>
  commune
</span>::Modules 🚀


</h1>
<img src="./gif/cubes/MultiColourCubeSpin.gif" className='w-[500px] h-[300px]' />
<p className='text-xl font-medium'>Coming soon... 🚧 🏗️</p> */}