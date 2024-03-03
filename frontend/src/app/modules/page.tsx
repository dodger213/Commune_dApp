"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import SearchBar from "@/components/molecules/search-bar/search-bar";
import { Pagination } from 'antd';
import Modal from "antd/es/modal/Modal";
import ModuleItem from "@/components/molecules/module-item";
import axios from "axios";

const PolkadotWalletButton = dynamic(
	() => import("@/components/atoms/polkadot-wallet-button"),
	{ ssr: false }
);

export default function () {
	const [searchString, setSearchString] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 16;
	const [loadedModules, setLoadedModules] = useState<any[]>([]);
	const [displayedModules, setDisplayedModules] = useState<any[]>([]);
	const [filteredModules, setFilteredModules] = useState<any[]>([]);

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

	const handlePageChange = (page: any) => {
		setCurrentPage(page);
		updateDisplayedModules(filteredModules, page)
	}

	const updateDisplayedModules = (modules: any[], page: number) => {
		const startIndex = (page - 1) * itemsPerPage;
		const endIndex = startIndex + itemsPerPage;
		setDisplayedModules(modules.slice(startIndex, endIndex));
	};


	return (
		<>
			<main className="mt-[30px] flex flex-col items-center justify-center my-auto mx-auto xl:w-[1400px] px-[20px] ">
				<PolkadotWalletButton/>
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
					<span style={{height: "1000px"}}>Loading modules...</span>
				)}
			</main>
			<Pagination current={currentPage} total={filteredModules.length} defaultPageSize={16} showSizeChanger={false} onChange={handlePageChange} className="dark:text-white mx-auto" />;
		</>
	);
}
