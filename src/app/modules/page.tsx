import classNames from "classnames";

import ModulesService from "@/services/modules-service";
import ModuleTile from "./components/module-tile/module-tile";

import classes from './modules.module.css';
import SearchBar from "./components/search-bar";

export default async function () {
    const modulesList = await ModulesService.getModulesList();

    return (
        <main className={classNames(classes.content, "flex flex-col items-center justify-center  my-auto ")}>
            <SearchBar />
            <ul className={classes.modulesList}>
            {modulesList.map((module, i) => (
                <ModuleTile
                    key={module.name}
                    {...module}
                />
            ))}
            </ul>
        </main>
    );
}