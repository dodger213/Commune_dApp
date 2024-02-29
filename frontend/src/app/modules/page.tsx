"use client";

import classNames from "classnames";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import SearchBar from "@/components/molecules/search-bar/search-bar";
import { Pagination } from 'antd';
import Modal from "antd/es/modal/Modal";
import ModuleItem from "@/components/molecules/module-item";
import axios from "axios";

const PolkadotWallet = dynamic(
	() => import("@/app/api/polkadot/PolkadotWallet"),
	{ ssr: false }
);

export default function () {
	const [searchString, setSearchString] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 16;
	const [loadedModules, setLoadedModules] = useState<any[]>([]);
	const [displayedModules, setDisplayedModules] = useState<any[]>([]);
	const [filteredModules, setFilteredModules] = useState<any[]>([]);
	const [isShowPolkadotWalletModalOpen, setIsShowPolkadotWalletModalOpen] = useState(false)

	useEffect(() => {
		const filtered = searchString
			? loadedModules.filter((module) =>
				module.id.toLowerCase().includes(searchString.toLowerCase())
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

	const pageCount = Math.ceil(filteredModules.length / itemsPerPage);

	useEffect(() => {
		async function fetchModules() {
			const response = await axios.get('https://huggingface.co/api/spaces?full=full&direction=-1&sort=likes&limit=5000')
			setLoadedModules(response.data);
			updateDisplayedModules(response.data, currentPage);
		}

		fetchModules();
	}, []);

	const handlePageChange = (page: any) => {
		setCurrentPage(page);
		updateDisplayedModules(filteredModules, page)
	}

	const handleModulesFetched = (modules: string[]) => {
		const formattedModules = modules.map((moduleName: string) => ({
			name: moduleName,
		}));
		setLoadedModules(formattedModules);
		updateDisplayedModules(formattedModules, currentPage);
	};

	const updateDisplayedModules = (modules: any[], page: number) => {
		const startIndex = (page - 1) * itemsPerPage;
		const endIndex = startIndex + itemsPerPage;
		setDisplayedModules(modules.slice(startIndex, endIndex));
	};

	const handlePolkadotWalletModal = () => {
		setIsShowPolkadotWalletModalOpen(true)
	}

	const handleShowPolkadotWalletModalCancel: () => void = () => {
		setIsShowPolkadotWalletModalOpen(false);
	};

	return (
		<>
			<main className="mt-[30px] flex flex-col items-center justify-center my-auto mx-auto xl:w-[1400px] px-[20px] ">
				<div className=' mb-[20px] bg-blue-700 rounded-lg shadow-lg hover:shadow-2xl text-center hover:bg-blue-600 duration-200 
					text-white hover:text-white font-sans font-semibold px-2 py-2 w-full flex justify-center items-center
						hover:border-blue-300 hover:border-2 hover:border-solid cursor-pointer' 	onClick={handlePolkadotWalletModal}>
					<img style={{ width: "auto", height: "2.7rem", marginRight: "0.25rem" }} src="/svg/polkadot.svg" alt="My Site Logo" />
					<span>Connect Wallet</span>
				</div>
				<SearchBar
					setSearchString={setSearchString}
					searchString={searchString}
				/>
				{displayedModules && displayedModules.length > 0 ? (
					<ul className='mt-[40px] flex justify-center flex-wrap gap-[20px]'>
						{displayedModules.map((item, idx) => (
							<ModuleItem key={idx} id={item.id} cardData={item.cardData} />
						))}
					</ul>
				) : (
					<span style={{height: "1500px"}}>There is no data to display</span>
				)}
			</main>
			<Pagination current={currentPage} total={pageCount} defaultPageSize={10} onChange={handlePageChange} className="dark:text-white mx-auto" />;
		{
			isShowPolkadotWalletModalOpen &&
			<Modal open={isShowPolkadotWalletModalOpen} onCancel={handleShowPolkadotWalletModalCancel} footer={null} width={500}>
				<PolkadotWallet onModulesFetched={handleModulesFetched} />
			</Modal>
		}
		</>
	);
}
