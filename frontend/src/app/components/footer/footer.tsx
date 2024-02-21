import { externalLinks } from "@/config";
import classes from "./footer.module.css";

function OpenIcon() {
	return (
		<svg width="13.5" height="13.5" aria-hidden="true" viewBox="0 0 24 24">
			<path
				fill="currentColor"
				d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"
			></path>
		</svg>
	);
}

export default function Footer() {
	return (
		<footer className={classes.footer}>
			<div className={classes.container}>
				<div className={classes.row}>
					<div className={classes.col}>
						<div className={classes.title}>📚 Docs</div>
						<ul className={classes.list}>
							<li className={classes.item}>
								<a className={classes.link} href="/docs/introduction">
									Introduction
								</a>
							</li>
							<li className={classes.item}>
								<a className={classes.link} href="/docs/setup-commune">
									Installation
								</a>
							</li>
						</ul>
					</div>
					<div className={classes.col}>
						<div className={classes.title}>🔗 Community</div>
						<ul className={classes.list}>
							<li className={classes.item}>
								<a
									href="https://discord.gg/communeai"
									target="_blank"
									rel="noopener noreferrer"
									className={classes.link}
								>
									Discord
									<OpenIcon />
								</a>
							</li>
							<li className={classes.item}>
								<a
									href="https://twitter.com/communeaidotorg"
									target="_blank"
									rel="noopener noreferrer"
									className={classes.link}
								>
									Twitter
									<OpenIcon />
								</a>
							</li>
							<li className={classes.item}>
								<a
									href="https://github.com/commune-ai"
									target="_blank"
									rel="noopener noreferrer"
									className={classes.link}
								>
									GitHub
									<OpenIcon />
								</a>
							</li>
						</ul>
					</div>
					<div className={classes.col}>
						<div className={classes.title}>➕ More</div>
						<ul className={classes.list}>
							<li className={classes.item}>
								<a
									href={externalLinks.whitepaper}
									target="_blank"
									rel="noopener noreferrer"
									className={classes.link}
								>
									📄 Whitepaper
								</a>
							</li>
						</ul>
					</div>
				</div>
				<div className={classes.copyright}>
					Copyright © 2023 Commune, Inc. Built with Docusaurus.
				</div>
			</div>
		</footer>
	);
}
