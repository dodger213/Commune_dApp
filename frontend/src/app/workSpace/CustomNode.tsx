import { memo, FC, CSSProperties } from 'react';
import { Handle, Position, NodeProps, NodeResizer } from 'reactflow';
import classNames from "classnames";
import { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "./components/search-bar";
import classes from "./modules.module.css";
import ModuleItem from "./components/module-item";
import dynamic from "next/dynamic";

const sourceHandleStyleA: CSSProperties = { left: 50 };
const sourceHandleStyleB: CSSProperties = {
  right: 50,
  left: 'auto',
};

const PolkadotWallet = dynamic(
	() => import("@/app/api/polkadot/PolkadotWallet"),
	{ ssr: false }
);

const CustomNode: FC<NodeProps> = ({ data, xPos, yPos }) => {
  const [searchString, setSearchString] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 300;
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
		// async function fetchModules() {
		// 	const modules = await ModulesService.getModulesList();
		// 	setLoadedModules(modules);
		// 	updateDisplayedModules(modules, currentPage);
		// }

		async function fetchModules() {
			const response = await axios.get('https://huggingface.co/api/spaces?full=full&direction=-1&sort=likes&limit=5000')
			setLoadedModules(response.data);
			updateDisplayedModules(response.data, currentPage);
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
      <NodeResizer />
      {/* <Handle type="target" position={Position.Top} /> */}
      <SearchBar
        setSearchString={setSearchString}
        searchString={searchString}
      />
      {displayedModules && displayedModules.length > 0 ? (
        <ul className={classes.modulesList}>
          {displayedModules.map((item, idx) => (
            <ModuleItem key={idx} id={item.id} cardData={item.cardData} />
          ))}
        </ul>
      ) : (
        <span className="dark: text-white" style={{height: "1500px"}}>There is no data to display</span>
      )}
      {/* <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        style={sourceHandleStyleA}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        style={sourceHandleStyleB}
      /> */}
    </>
  );
};

export default memo(CustomNode);
