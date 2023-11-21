"use client";

import { useEffect, useState } from "react";
import classNames from "classnames";

import classes from './search-bar.module.css';


export default function SearchBar() {
    const [searchedString, setSearchedString] = useState('');

    useEffect(() => {

    }, []);

    return (
        <section className={classNames(classes.inputWrapper, "my-auto mx-auto bg-gray-100 rounded-lg border-2 border-zinc-700 dark:border-gray-100 border-solid shadow-md")}>
            <input
                className={classNames("shadow-xl", classes.searchInput)}
                type="text"
                value={searchedString}
                onChange={(e) => setSearchedString(e.target.value)}
                placeholder="Search for module"
            />
        </section>
    );
}