import React, { useEffect, useState } from "react";
import classNames from "classnames";
import Layout from "@theme/Layout";
// import ExtraSidebar from '../components/Modules/components/SideBarComponent/index';

import '../css/global.css';
import ModulesService from '../services/modules-service';
import classes from './modules.module.css';
import ModuleTile from '../components/Frontpage/ModuleTile/module-tile';
import useThrottling from '../hooks/use-throttling';
import ModuleDetailsModal from '../components/Frontpage/ModuleDetailsModal/module-details-modal';


export default function Modules() {
  const [ modulesList, setModulesList ] = useState([]);
  const [ selectedModuleName, setSelectedModuleName ] = useState(null);
  const [ searchedModuleString, setSearchedModuleString ] = useState('');
  const throttle = useThrottling();

  useEffect(() => {
    ModulesService.getModulesList(searchedModuleString).then(setModulesList);
  }, []);

  useEffect(() => {
    throttle(() => ModulesService.getModulesList(searchedModuleString).then(setModulesList));
  }, [searchedModuleString]);

  return (
    <Layout dark-theme="dark" title={`🚀 Modules`} description="Connect to the current modules">
      {/* <div className='flex flex-col items-center justify-center  my-auto '>
            <h1 className='text-4xl font-bold'>
            <span className='text-[#ffb4ed] dark:text-[#FFD6F5] hover:animate-pulse duration-500'>
            commune
            </span>::Modules 🚀
            </h1>
            <img src="./gif/cubes/MultiColourCubeSpin.gif" className='w-[500px] h-[300px]' />
            <p className='text-xl font-medium'>Coming soon...</p> 
          <div className='fixed z-10 flex flex-col items-center justify-center rounded-lg mt-10'>
           
          </div>
        </div> */}
        <main className={
          classNames(
            classes.content,
            'flex flex-col items-center justify-center  my-auto '
          )}>
          <section className={classNames(
            classes.inputWrapper,
            'my-auto mx-auto z-40 bg-gray-100 rounded-lg border-2 border-zinc-700 dark:border-gray-100 border-solid shadow-md'
          )}>
            <input
              className={classNames('shadow-xl', classes.searchInput)}
              type="text"
              value={searchedModuleString}
              onChange={e => setSearchedModuleString(e.target.value)}
              placeholder="Search for module"
            />
          </section>
          <ul className={classes.modulesList}>
            {modulesList.map((module, i) => (
              <ModuleTile
                key={module.name}
                {...module}
                index={i}
                onClick={() => setSelectedModuleName(module.name)}
              />
            ))}
          </ul>
          <ModuleDetailsModal
            isOpen={!!selectedModuleName}
            onClose={() => setSelectedModuleName(null)}
            moduleName={selectedModuleName}
          />
        </main>
    </Layout>
  );
}
