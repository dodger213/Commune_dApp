import Link from "next/link";

import classes from './docs.module.css';
import DocsMenu from "./components/docs-menu";

export default function DocsLayout({
    children,
}: {
    children: React.ReactNode,
}) {
    return (
        <div className={classes.docsLayout}>
            <DocsMenu />
            <section className={classes.docsContent}>
                {children}
            </section>
        </div>
    );
}