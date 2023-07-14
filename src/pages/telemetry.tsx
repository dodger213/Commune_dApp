import React, { useState } from 'react';
import Layout from '@theme/Layout';

export default function Telemetry() : JSX.Element { 

    return (<Layout
        title={`Telemetry`}
        description="keep track of all chain(s)">
        <div className='flex flex-col items-center justify-center my-auto'>
            <h1 className='text-4xl font-bold'>
            <span className='text-[#ffb4ed] dark:text-[#FFD6F5] hover:animate-pulse duration-500'>
            commune
            </span>::Telemetry ⛓️
            </h1>
            <img src="./gif/cubes/MultiColourCubeSpin.gif" className='w-[500px] h-[300px]' />
            <p className='text-xl font-medium'>Coming soon...</p> 
        </div>
        </Layout>)
}