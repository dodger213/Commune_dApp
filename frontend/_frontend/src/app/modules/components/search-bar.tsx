"use client";

import { useEffect, useState } from "react";
import classNames from "classnames";

import classes from './search-bar.module.css';

interface SearchBarProps {
    setSearchString: (value: string) => void;
    searchString: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ setSearchString, searchString }) => {

    useEffect(() => {

    }, []);

    return (
        <section className={classNames(classes.inputWrapper, "my-auto mx-auto bg-gray-100 rounded-lg border-zinc-700 dark:border-gray-100 border-solid shadow-md mb-4")}>
            <input
                className={classNames("shadow-xl", classes.searchInput)}
                type="text"
                style={{ padding: '2rem' }}
                value={searchString}
                onChange={({ target: { value } }) => setSearchString(value)}
                placeholder="Search for module"
            />
        </section>
    );
}

export default SearchBar;
