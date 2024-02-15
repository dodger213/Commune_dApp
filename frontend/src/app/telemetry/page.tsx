/* This page has been copy pasted from original Docasaurus project */
export default function TelemetryPage() {
	return (
		<div className="flex flex-col items-center justify-center my-auto">
			<h1 className="text-4xl font-bold dark:text-white">
				<span className="text-[#ffb4ed] dark:text-[#FFD6F5] hover:animate-pulse duration-500">
					commune
				</span>
				::Telemetry ⛓️
			</h1>
			<iframe src="http://telemetry.communeai.net/" style={{ width: '100%', height: '620px' }}></iframe>
		</div>
	);
}
