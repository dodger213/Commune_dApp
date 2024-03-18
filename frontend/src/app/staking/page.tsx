"use client"
import React, { useEffect, useState } from 'react';
import { Card, Button, Popover } from 'antd';
import { Pagination } from 'antd';
import { ValidatorType } from '../api/staking/type';
import { useGetValidatorsQuery } from "@/app/api/staking/modulelist"
import SearchBar from '@/components/molecules/search-bar/search-bar';

const CommunalSystem: React.FC = () => {

    const { data: validatorData, isLoading: validatorLoading } =
        useGetValidatorsQuery(undefined, {
            pollingInterval: 300000,
        })

    console.log('-------------this is the validator--------', validatorData, validatorLoading)
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
                            const content = <div className='flex flex-col'>
                                <div className='flex'>
                                    <p>- Address: {module.address},</p>
                                    <p className='ml-1'>- Apy: {module.apy},</p>
                                    <p className='ml-1'>- Balance: {module.balance},</p>
                                    <p className='ml-1'>- DelegationFee: {module.delegation_fee}</p>
                                </div>
                                <div className='flex'>
                                    <p>- Dividends: {module.dividends},</p>
                                    <p className='ml-1'>- Emission: {module.emission},</p>
                                    <p className='ml-1'>- Incentive: {module.incentive},</p>
                                    <p className='ml-1'>- Verified: {module.isVerified}</p>
                                </div>
                                <div className='flex'>
                                    <p>- Key: {module.key},</p>
                                    <p className='ml-1'>- Latest Update: {module.last_update},</p>
                                    <p className='ml-1'>- Name: {module.name},</p>
                                    <p className='ml-1'>- RegBlock: {module.regblock}</p>
                                </div>
                                <div className='flex'>
                                    <p>- Stake: {module.stake},</p>
                                    <p className='ml-1'>- TotalStakers: {module.total_stakers},</p>
                                    <p className='ml-1'>- TotalValidators: {module.total_validators},</p>
                                    <p className='ml-1'>- Type: {module.type},</p>
                                    <p className='ml-1'>- WalletStaked: {module.wallet_staked}</p>
                                </div>
                            </div>;
                            return <Popover content={content} title="Detail Info" key={module.address}>
                                <Card title={module.name} style={{ width: 300, marginBottom: 20 }} className='mx-5 cursor-pointer shadow-xl'>
                                    <p>Amount: {module.balance}</p>
                                    <p>Staked: {stakedModules.includes(module.address) ? 'Yes' : 'No'}</p>
                                    <div className='flex'>
                                        <Button onClick={() => stakeModule(module.address)} className='flex items-center mr-1 bg-blue-500 rounded-lg shadow-lg hover:shadow-2xl text-center hover:bg-blue-600 duration-200 text-white hover:text-white font-sans 
                justify-center px-2 py-2 cursor-pointer'>Stake</Button>
                                        <Button onClick={() => unstakeModule(module.address)} className='mr-1'>Unstake</Button>
                                        <Button onClick={() => useModule(module.address)}>Use</Button>
                                    </div>
                                </Card>
                            </Popover>
                        }
                    )
                }
            </div>
            <Pagination current={currentPage} total={filteredModules.length} defaultPageSize={16} showSizeChanger={false} onChange={handlePageChange} className="text-black dark:text-white mx-auto" />
        </div>
    );
};

export default CommunalSystem;
