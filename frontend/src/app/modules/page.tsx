"use client";

import classNames from "classnames";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import ModulesService from "@/services/modules-service";
import ModuleTile from "./components/module-tile/module-tile";
import classes from "./modules.module.css";
import SearchBar from "./components/search-bar";
import { Pagination } from 'antd';

const PolkadotWallet = dynamic(
	() => import("@/app/api/polkadot/PolkadotWallet"),
	{ ssr: false }
);

export default function () {
	const [searchString, setSearchString] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 8;
	const [loadedModules, setLoadedModules] = useState<any[]>([]);
	const [displayedModules, setDisplayedModules] = useState<any[]>([]);
	const [filteredModules, setFilteredModules] = useState<any[]>([]);

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

	console.log('---------------this is the pageCount------------', pageCount, currentPage)

	useEffect(() => {
		async function fetchModules() {
			const modules = await ModulesService.getModulesList();
			setLoadedModules(modules);
			updateDisplayedModules(modules, currentPage);
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

	return (
		<>
			<main
				className={classNames(
					classes.content,
					"flex flex-col items-center justify-center my-auto "
				)}
			>
				<PolkadotWallet onModulesFetched={handleModulesFetched} />
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
					<span className="dark: text-white">There is no data to display</span>
				)}
			</main>
			<Pagination current={currentPage} total={pageCount} defaultPageSize={10} onChange={handlePageChange} className="dark:text-white mx-auto" />;
		</>
	);
}
