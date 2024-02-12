import CubeSection from "./components/cube-section";
import ExchangeComponent from "./components/exchange-component";

export default function ExchangesPage() {
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginTop: "20px" }}>
            <h1>💱 Exchanges</h1>
            <ExchangeComponent />
            <CubeSection />
        </div>
    );
}
