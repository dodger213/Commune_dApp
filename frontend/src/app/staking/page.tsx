"use client"
import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import { Card, Button } from 'antd';
import { Pagination } from 'antd';
import Style from './staking.module.css';
import { ValidatorType } from '../api/staking/type';
import { useGetValidatorsQuery } from "@/app/api/staking/modulelist"
import SearchBar from '@/components/molecules/search-bar/search-bar';

const CommunalSystem: React.FC = () => {

    const { data: validatorData } =
        useGetValidatorsQuery(undefined, {
            pollingInterval: 300000,
        })

    const [searchString, setSearchString] = useState("");
    const [stakedModules, setStakedModules] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [displayedModules, setDisplayedModules] = useState<ValidatorType[]>([]);
    const [filteredModules, setFilteredModules] = useState<ValidatorType[]>([]);
    const [loadedModules, setLoadedModules] = useState<ValidatorType[]>([]);

    const itemsPerPage = 16;
    // Function to stake a module
    const stakeModule = (moduleId: string) => {
        setStakedModules([...stakedModules, moduleId]);
    };

    // Function to unstake a module
    const unstakeModule = (moduleId: string) => {
        setStakedModules(stakedModules.filter(id => id !== moduleId));
    };

    // Function to use a module (when it's staked)
    const useModule = (moduleId: string) => {
        if (stakedModules.includes(moduleId)) {
            // Perform action when module is used
            console.log(`Module ${moduleId} used!`);
        } else {
            console.log(`Module ${moduleId} is not staked.`);
        }
    };

    useEffect(() => {
        validatorData && setLoadedModules(validatorData)
    }, [validatorData])

    useEffect(() => {
        const filtered = searchString
            ? loadedModules.filter((module) =>
                module.name.toLowerCase().includes(searchString.toLowerCase())
            )
            : loadedModules;
        setFilteredModules(filtered);
        if (searchString) {
            setCurrentPage(1);
            updateDisplayedModules(filtered, 1);
        } else {
            updateDisplayedModules(filtered, currentPage);
        }
    }, [searchString, loadedModules]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        updateDisplayedModules(filteredModules, page)
    }

    const updateDisplayedModules = (modules: ValidatorType[], page: number) => {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setDisplayedModules(modules.slice(startIndex, endIndex));
    };

    return (
        <div className='mt-5 mb-5 flex flex-col items-center justify-center my-auto mx-auto w-[95%] px-[10px]'>
            <SearchBar
                setSearchString={setSearchString}
                searchString={searchString}
            />
            <div className="flex justify-center flex-wrap gap-[10px]">
                {
                    displayedModules && displayedModules.map(
                        module => {
                            return <Card title={<span className={classnames('text-white')}>{module.name}</span>} style={{ width: 300, marginBottom: 20 }} className={classnames(Style.cardClass, 'mx-5 cursor-pointer shadow-xl card-class text-white')} key={module.address}>
                                <p className='text-white'>Amount: {module.balance}</p>
                                <p className='text-white'>Staked: {stakedModules.includes(module.address) ? 'Yes' : 'No'}</p>
                                <div className='flex'>
                                    <Button onClick={() => stakeModule(module.address)} className='flex items-center mr-1 bg-blue-500 rounded-lg shadow-lg hover:shadow-2xl text-center hover:bg-blue-600 duration-200 text-white hover:text-white font-sans 
                justify-center px-2 py-2 cursor-pointer'>Stake</Button>
                                    <Button onClick={() => unstakeModule(module.address)} className='mr-1 text-white'>Unstake</Button>
                                    <Button onClick={() => useModule(module.address)} className='text-white'>Use</Button>
                                </div>
                            </Card>
                        }
                    )
                }
            </div>
            <Pagination current={currentPage} total={filteredModules.length} defaultPageSize={16} showSizeChanger={false} onChange={handlePageChange} className="text-black dark:text-white mx-auto" />
        </div>
    );
};

export default CommunalSystem;
