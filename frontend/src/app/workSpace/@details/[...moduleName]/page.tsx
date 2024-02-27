import ModuleDetailsModal from "./components/module-details-modal/module-details-modal";

export default function ModuleDetailsPage({
    params,
}: {
    params: {
      moduleName: string,
    },
}) {
    const { moduleName } = params;

    const decodedModuleName = decodeURIComponent(moduleName[0]);

    return (
        <ModuleDetailsModal
            name={decodedModuleName}
        />
    );
}