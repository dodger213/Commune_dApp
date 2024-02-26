"use client";

import classNames from "classnames";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import ModulesService from "@/services/modules-service";
import ModuleTile from "./components/module-tile/module-tile";
import classes from "./modules.module.css";
import SearchBar from "./components/search-bar";
import Modal from "antd/es/modal/Modal";
import Pagination from "react-paginate";

const PolkadotWallet = dynamic(
	() => import("@/app/api/polkadot/PolkadotWallet"),
	{ ssr: false }
);

export default function () {
	const [searchString, setSearchString] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 849;
	const [loadedModules, setLoadedModules] = useState<any[]>([]);
	const [displayedModules, setDisplayedModules] = useState<any[]>([]);
	const [filteredModules, setFilteredModules] = useState<any[]>([]);
	const [isShowPolkadotWalletModalOpen, setIsShowPolkadotWalletModalOpen] = useState(false)

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

	const pageCount = Math.ceil(filteredModules.length / itemsPerPage);

	useEffect(() => {
		async function fetchModules() {
			const modules = await ModulesService.getModulesList();
			setLoadedModules(modules);
			updateDisplayedModules(modules, currentPage);
		}

		fetchModules();
	}, []);

	const handlePageChange = (selectedItem: any) => {
		setCurrentPage(selectedItem.selected + 1);
		updateDisplayedModules(filteredModules, selectedItem.selected + 1);
	};

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
			<main
				className={classNames(
					classes.content,
					"flex flex-col items-center justify-center my-auto "
				)}
			>
				<div className={classNames(classes.Polkadot, ' bg-blue-700 rounded-lg shadow-lg hover:shadow-2xl text-center hover:bg-blue-600 duration-200 text-white hover:text-white font-sans font-semibold justify-center px-2 py-2 hover:border-blue-300 hover:border-2 hover:border-solid cursor-pointer')} onClick={handlePolkadotWalletModal}>
					<img style={{ width: "auto", height: "2.7rem", marginRight: "0.25rem" }} src="/svg/polkadot.svg" alt="My Site Logo" />
					<span>Connect Wallet</span>
				</div>
				<SearchBar
					setSearchString={setSearchString}
					searchString={searchString}
				/>
				{displayedModules && displayedModules.length > 0 ? (
					<ul className={classes.modulesList}>
						{displayedModules.map((module, i) => (
							<ModuleTile key={module.name} {...module} />
						))}
					</ul>
				) : (
					<span style={{height: "1500px"}}>There is no data to display</span>
				)}
			</main>
			{/* {filteredModules.length > 8 && (
				<Pagination
					pageCount={pageCount}
					onPageChange={handlePageChange}
					forcePage={currentPage - 1}
					containerClassName="flex justify-center items-center space-x-3 my-4 text-lg dark:text-white"
					pageLinkClassName="px-5 text-lg border rounded hover:bg-gray-200 transition-colors duration-200 py-3"
					activeClassName="bg-blue-500 text-white py-3 rounded"
					previousLabel={"previous"}
					nextLabel={"next"}
					breakLabel={"..."}
					previousClassName={`mr-2 ${currentPage === 1
						? "text-gray-500"
						: "text-blue-500 hover:text-blue-700"
						}`}
					nextClassName={`${currentPage === pageCount
						? "text-gray-500"
						: "text-blue-500 hover:text-blue-700"
						}`}
				/>
			)} */}

		{
			isShowPolkadotWalletModalOpen &&
			<Modal open={isShowPolkadotWalletModalOpen} onCancel={handleShowPolkadotWalletModalCancel} footer={null} width={500}>
				<PolkadotWallet onModulesFetched={handleModulesFetched} />
			</Modal>
		}
		</>
	);
}
