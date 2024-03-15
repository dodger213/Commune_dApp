"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Pagination } from 'antd';
import axios from "axios";
import Loading from "@/components/molecules/bittensor/loading";
import ModuleItem, { ModuleItemPropsType } from "@/components/molecules/module-item";
import SearchBar from "@/components/molecules/search-bar/search-bar";

const PolkadotWalletButton = dynamic(
	() => import("@/components/atoms/polkadot-wallet-button"),
	{ ssr: false }
);

const ModulePage = () => {
	const [searchString, setSearchString] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 16;
	const [loadedModules, setLoadedModules] = useState<ModuleItemPropsType[]>([]);
	const [displayedModules, setDisplayedModules] = useState<ModuleItemPropsType[]>([]);
	const [filteredModules, setFilteredModules] = useState<ModuleItemPropsType[]>([]);

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

	useEffect(() => {
		async function fetchModules() {
			const response = await axios.get('https://huggingface.co/api/spaces?full=full&direction=-1&sort=likes&limit=5000')
			setLoadedModules(response.data);
			updateDisplayedModules(response.data, currentPage);
		}

		fetchModules();
	}, []);

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
		updateDisplayedModules(filteredModules, page)
	}

	const updateDisplayedModules = (modules: ModuleItemPropsType[], page: number) => {
		const startIndex = (page - 1) * itemsPerPage;
		const endIndex = startIndex + itemsPerPage;
		setDisplayedModules(modules.slice(startIndex, endIndex));
	};

	return (
		<>
			<main className="mt-[30px] flex flex-col items-center justify-center my-auto mx-auto xl:w-[1400px] px-[20px] ">
				<PolkadotWalletButton />
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
					<Loading />
				)}
			</main>
			<Pagination current={currentPage} total={filteredModules.length} defaultPageSize={16} showSizeChanger={false} onChange={handlePageChange} className="dark:text-white mx-auto" />;
		</>
	);
}

export default ModulePage;
