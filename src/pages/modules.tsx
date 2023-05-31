import React from 'react';
import Layout from '@theme/Layout';
import '../css/global.css'

// import ReactFlow, {Background} from 'reactflow';

// import 'reactflow/dist/style.css';


// const initialNodes = [
//     { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
//     { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
//   ];
//   const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];
  
//               <div className='flex flex-col items-center justify-center h-screen'>
{/* <h1 className='text-4xl font-bold'>🚀 Modules</h1> */}
{/* <p className='text-2xl'>Coming soon...</p> */}
// </div>
export default function modules() {
  return (
    <Layout
        dark-theme="dark"
        title={`🚀 Modules`}
    
    >

    <div className='text-lg dark:text-white text-black'>
        {/*with a opaque background have comming soon page  */}
        <div className='flex flex-col items-center justify-center h-1/2'>
            
            <div className='z-10 flex flex-col items-center justify-center rounded-lg mt-10 '>
                <h1 className='text-4xl font-bold'><span className='text-[#ffb4ed] dark:text-[#FFD6F5] hover:animate-pulse duration-500'>commune</span>::Modules 🚀</h1>
                <img src="./gif/cubes/MultiColourCubeSpin.gif" className=' w-[500px] h-[300px]'/>
                <p className=' text-xl font-medium'>Coming soon... 🚧 🏗️</p>
            </div>

        </div>
    </div>
    </Layout>
  );
}



