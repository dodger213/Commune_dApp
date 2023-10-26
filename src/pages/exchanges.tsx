import React from "react";
import ExchangeComponent from "../components/Frontpage/Exchanges/ListComponent";

import Layout from "@theme/Layout";
import CubeSection from "../components/Frontpage/Exchanges/cubeComponent";

const Exchanges: React.FC = () => {
  return (
    <Layout title={`Exchanges`} description="Buy or Sell $COM">
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginTop: "20px" }}>
        <h1>💱 Exchanges</h1>
        <ExchangeComponent />
        <CubeSection />
      </div>
    </Layout>
  );
};

export default Exchanges;
