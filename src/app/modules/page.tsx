"use client";

import classNames from "classnames";
import { useEffect, useState } from "react";

import { modulesList } from "@/services/modules-service";
import ModuleTile from "./components/module-tile/module-tile";

import classes from './modules.module.css';
import SearchBar from "./components/search-bar";

type ModuleTileProps = {
    image_url?: string;
    name: string;
    address: string;
    description?: string;
    attributes?: string[];
};

export default function () {

    const [searchString, setSearchString] = useState('');

    const [updatedModuleList, setUpdatedModuleList] = useState<any[]>(modulesList);

    useEffect(() => {

        if (searchString) {
            const newData = modulesList.filter((item) => {
                return item.name?.toLowerCase().includes(searchString.toLowerCase())
            });

            setUpdatedModuleList(newData);
        } else {
            setUpdatedModuleList(modulesList);
        }

    }, [searchString])

    return (
        <main className={classNames(classes.content, "flex flex-col items-center justify-center  my-auto ")}>
            <SearchBar setSearchString={setSearchString} searchString={searchString} />
            {
                updatedModuleList ? <ul className={classes.modulesList}>
                    {updatedModuleList.map((module, i) => (
                        <ModuleTile
                            key={module.name}
                            {...module}
                        />
                    ))}
                </ul> : <span>There is no data to display</span>}

        </main>
    );
}
