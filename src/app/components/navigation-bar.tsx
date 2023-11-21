import Link from "next/link";

import config from "@/config";
import ThemeToggler from "./theme-toggler";

import classes from './navigation-bar.module.css';
import classNames from "classnames";
import ActiveLink from "./active-link";

function DiscordIcon () {
    return (
        <svg style={{ marginLeft:'10px' }} fill="currentColor" width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 127.14 96.36">
            <g id="图层_2" data-name="图层 2">
                <g id="Discord_Logos" data-name="Discord Logos">
                    <g id="Discord_Logo_-_Large_-_White" data-name="Discord Logo - Large - White">
                    <path className="cls-1" d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"></path>
                    </g>
                </g>
            </g>
        </svg>
    );
}

function TwitterIcon () {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" style={{ marginLeft:"15px"}} width="24" height="24" fill="currentColor" viewBox="0 0 248 204">
            <path fill="#1d9bf0" d="M221.95 51.29c.15 2.17.15 4.34.15 6.53 0 66.73-50.8 143.69-143.69 143.69v-.04c-27.44.04-54.31-7.82-77.41-22.64 3.99.48 8 .72 12.02.73 22.74.02 44.83-7.61 62.72-21.66-21.61-.41-40.56-14.5-47.18-35.07 7.57 1.46 15.37 1.16 22.8-.87-23.56-4.76-40.51-25.46-40.51-49.5v-.64c7.02 3.91 14.88 6.08 22.92 6.32C11.58 63.31 4.74 33.79 18.14 10.71c25.64 31.55 63.47 50.73 104.08 52.76-4.07-17.54 1.49-35.92 14.61-48.25 20.34-19.12 52.33-18.14 71.45 2.19 11.31-2.23 22.15-6.38 32.07-12.26-3.77 11.69-11.66 21.62-22.2 27.93 10.01-1.18 19.79-3.86 29-7.95-6.78 10.16-15.32 19.01-25.2 26.16z"></path>
        </svg>
    );
}

function GitHubIcon () {
    return (
        <svg style={{ marginLeft:"15px"}} width="24" height="24" fill="currentColor" viewBox="3 3 18 18">
            <title>GitHub</title>
            <path d="M12 3C7.0275 3 3 7.12937 3 12.2276C3 16.3109 5.57625 19.7597 9.15374 20.9824C9.60374 21.0631 9.77249 20.7863 9.77249 20.5441C9.77249 20.3249 9.76125 19.5982 9.76125 18.8254C7.5 19.2522 6.915 18.2602 6.735 17.7412C6.63375 17.4759 6.19499 16.6569 5.8125 16.4378C5.4975 16.2647 5.0475 15.838 5.80124 15.8264C6.51 15.8149 7.01625 16.4954 7.18499 16.7723C7.99499 18.1679 9.28875 17.7758 9.80625 17.5335C9.885 16.9337 10.1212 16.53 10.38 16.2993C8.3775 16.0687 6.285 15.2728 6.285 11.7432C6.285 10.7397 6.63375 9.9092 7.20749 9.26326C7.1175 9.03257 6.8025 8.08674 7.2975 6.81794C7.2975 6.81794 8.05125 6.57571 9.77249 7.76377C10.4925 7.55615 11.2575 7.45234 12.0225 7.45234C12.7875 7.45234 13.5525 7.55615 14.2725 7.76377C15.9937 6.56418 16.7475 6.81794 16.7475 6.81794C17.2424 8.08674 16.9275 9.03257 16.8375 9.26326C17.4113 9.9092 17.76 10.7281 17.76 11.7432C17.76 15.2843 15.6563 16.0687 13.6537 16.2993C13.98 16.5877 14.2613 17.1414 14.2613 18.0065C14.2613 19.2407 14.25 20.2326 14.25 20.5441C14.25 20.7863 14.4188 21.0746 14.8688 20.9824C16.6554 20.364 18.2079 19.1866 19.3078 17.6162C20.4077 16.0457 20.9995 14.1611 21 12.2276C21 7.12937 16.9725 3 12 3Z"></path>
        </svg>
    );
}

export default function NavigationBar() {
    return (
<nav aria-label="Main" className={classes.navbar}>
    <div className={classes.items}>
        <Link className={classes.brand} href="/">
            <div className={classes.logo}>
                <img style={{ width: "auto", height: "3.7rem", marginRight: "-0.25rem"}} src="/svg/commune.svg" alt="My Site Logo" />
            </div>
            <b>commune</b>
        </Link>
        <ActiveLink activeClassName={classes.activeModules} className={classNames(classes.item, classes.modules)} href="/modules">🚀 Modules</ActiveLink>
        <ActiveLink activeClassName={classes.activeDocs} className={classNames(classes.item, classes.docs)} href="/docs/introduction">📚 Docs</ActiveLink>
        <Link className={classNames(classes.item, classes.whitepaper)} href="https://ai-secure.github.io/DMLW2022/assets/papers/7.pdf" target="_blank" rel="noopener noreferrer">📄 Whitepaper</Link>
        <ActiveLink activeClassName={classes.active} className={classes.item} href="/telemetry">⛓️ Telemetry</ActiveLink>
        <ActiveLink activeClassName={classes.active} className={classes.item} href="/exchanges">💱  Exchanges</ActiveLink>
    </div>
    <div className={classNames(classes.items, classes.itemsRight)}>
        <Link className={classes.link} href="/docs/next/Introduction">🚀 v0.0.0</Link>
        <div className={classes.dropdown}>
            <Link className={classes.link} href="#" aria-haspopup="true" aria-expanded="false" role="button" >🔗 Community</Link>
            <ul className={classes.dropdownMenu}>
                <li>
                    <Link
                        className={classes.dropdownLink}
                        href="https://discord.gg/A8JGkZ9Dmm"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <div style={{ display:"flex", alignItems:"center", }}>
                        <span>Discord</span>
                        <DiscordIcon />
                        </div>
                    </Link>
                </li>
                <li>
                    <Link
                        className={classes.dropdownLink}
                        href="https://twitter.com/communeaidotorg"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <div style={{ display:"flex", alignItems:"center"}}>
                        <span>Twitter</span>
                        <TwitterIcon />
                        </div>
                    </Link>
                </li>
                <li>
                    <Link
                        className={classes.dropdownLink}
                        href="https://github.com/commune-ai"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <div style={{ display:"flex",alignItems:"center" }}>
                        <span>Github</span>
                        <GitHubIcon />
                        <span className="nx-sr-only"></span>
                        </div>
                    </Link>
                </li>
            </ul>
        </div>
        <div className={classes.themeTogglerWrapper}>
            <ThemeToggler />
        </div>
    </div>
</nav>    
);
}

function NavigationBar2() {
    return (
        <nav>
            <Link href="/modules">Modules</Link>
            <Link href="/docs">Docs</Link>
            <Link href={config.whitepaperUrl}>Whitepaper</Link>
            <Link href="/telemetry">Telemetry</Link>
            <Link href="/exchanges">Exchanges</Link>
            <ThemeToggler />
        </nav>
    );
}