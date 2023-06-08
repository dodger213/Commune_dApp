import React from 'react';
import Layout from '@theme/Layout';
import '../css/global.css';

export default function Modules() {
  return (
    <Layout dark-theme="dark" title={`🚀 Modules`}>
      <div className='text-lg dark:text-white text-black'>
        <div className='flex flex-col items-center justify-center h-screen'>
          <div className='z-10 flex flex-col items-center justify-center rounded-lg mt-10'>
            <h1 className='text-4xl font-bold'>
              <span className='text-[#ffb4ed] dark:text-[#FFD6F5] hover:animate-pulse duration-500'>
                commune
              </span>::Modules 🚀

              
            </h1>
            <img src="./gif/cubes/MultiColourCubeSpin.gif" className='w-[500px] h-[300px]' />
            <p className='text-xl font-medium'>Coming soon... 🚧 🏗️</p>
            <iframe
          src='https://localhos:8501'  // Replace with the URL of the desired iframe content
          width='800'
          height='600'
          title='Embedded Content'
        ></iframe>
          </div>
        </div>
      </div>

    </Layout>
  );
}
