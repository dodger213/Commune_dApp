import Link from "next/link";

import classes from "./docs.module.css";
import DocsMenu from "./components/docs-menu";
import classNames from "classnames";

export default function DocsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className={classes.docsLayout}>
			<DocsMenu />
			<section className={classNames(classes.docsContent, "dark:text-white")}>
				{children}
			</section>
		</div>
	);
}
