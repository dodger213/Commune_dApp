import React, { useEffect, useState } from "react";

const ExchangeRow = ({ exchange, index }) => (
  <tr className="h-12">
    <td className="px-3 md:px-6 py-4 text-center text-sm font-medium text-gray-900">{index + 1}</td>

    <td className="px-3 md:px-6 py-4  text-center text-md text-gray-500">
      <div className="flex items-center justify-center">
        <img className="h-5 w-5 mr-2" src={exchange.logo} alt={`${exchange.name} Logo`} />
        {exchange.name}
      </div>
    </td>
    <td className="px-3 md:px-6 py-4 text-center text-md text-gray-500">{exchange.price}</td>
    <td className="px-3 md:px-6 py-4  text-center text-md text-gray-500">{exchange.volume}</td>
    <td className="px-3 md:px-6 py-4 text-center text-md text-gray-500">{exchange.volume7d}</td>
    <td className="px-3 md:px-6 py-4  text-center text-md font-medium">
      <a href={exchange.link} className="text-blue-700 hover:text-blue-800">
        <div className="inline-block bg-blue-700 rounded-lg shadow-lg hover:shadow-2xl text-center hover:bg-blue-600 duration-200 text-white font-sans font-semibold px-2 py-2">Trade</div>
      </a>
    </td>
  </tr>
);

const ExchangeComponent = () => {
  const [comswapData, setComswapData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.comswap.io/orders/public/marketinfo");
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        const data = await response.json();
        setComswapData(data);
      } catch (error) {
        console.error("Error fetching Comswap data:", error);
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  const formatMarketCap = (marketCap) => {
    const marketCapInt = parseInt(marketCap, 10);
    return marketCapInt.toLocaleString();
  };

  const exchanges = [
    {
      name: "Comswap",
      logo: "https://comswap.io/static/media/logo.0eafc56c200101eecb87.png",
      price: comswapData ? `$${comswapData.price}` : "Loading...",
      volume: comswapData ? `$${comswapData.volume1d}` : "Loading...",
      volume7d: comswapData ? `$${comswapData.volume7d}` : "Loading...",
      link: "https://comswap.io",
    }, //add more exchanges
  ];

  return (
    <div className="z-40 bg-blue-50 rounded-lg border-2 border-blue-400 border-solid shadow-md p-3 max-w-3xl mx-auto  overflow-x-auto w-full">
      {error && <div className="mb-4 text-lg font-semibold text-red-500">Error: {error}</div>}
      {comswapData && (
        <div className="mb-4 text-lg font-semibold text-center">
          $COM Current Market Cap: <br /> ${formatMarketCap(comswapData.marketCap)}
        </div>
      )}
      <table className="rounded-md">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-3 md:px-6 py-3 text-center text-xs font-medium text-gray-500">
              #
            </th>
            <th scope="col" className="px-3 md:px-6 py-3 text-center text-xs font-medium text-gray-500">
              EXCHANGE
            </th>
            <th scope="col" className="px-3 md:px-6 py-3 text-center text-xs font-medium text-gray-500">
              LAST PRICE
            </th>
            <th scope="col" className="px-3 md:px-6 py-3 text-center text-xs font-medium text-gray-500">
              24H VOLUME
            </th>
            <th scope="col" className="px-3 md:px-6 py-3 text-center text-xs font-medium text-gray-500">
              7D VOLUME
            </th>
            <th scope="col" className="px-3 md:px-6 py-3 text-center text-xs font-medium text-gray-500">
              BUY/SELL
            </th>
          </tr>
        </thead>
        <tbody className="bg-white ">
          {exchanges.map((exchange, idx) => (
            <ExchangeRow key={idx} exchange={exchange} index={idx} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExchangeComponent;
