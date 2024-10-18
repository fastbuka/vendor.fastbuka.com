import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

interface CryptoData {
  id: string;
  image: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
}

const CryptoTable: React.FC = () => {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd",
              ids: "usd-coin,stellar", // Add more cryptos if needed
              order: "market_cap_desc",
              sparkline: false,
            },
          }
        );
        setCryptoData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching crypto data:", error);
        setLoading(false);
      }
    };

    fetchCryptoData();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-1">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid">
          <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead className="bg-gray-100">
                <tr className="text-left text-gray-600 text-sm font-semibold">
                  <th className="py-4 px-6">Cryptocurrency</th>
                  {/* <th className="py-4 px-6">Symbol</th> */}
                  <th className="py-4 px-6">Current Price (USD)</th>
                  <th className="py-4 px-6">24h Change</th>
                </tr>
              </thead>
              <tbody>
                {cryptoData.map((crypto, index) => (
                  <tr
                    key={crypto.id}
                    className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}
                  >
                    {/* <td className="py-4 px-6 flex items-center gap-2">
                      <Image
                        src={crypto.image}
                        alt={crypto.name}
                        className="w-6 h-6 rounded-full"
                      />
                      {crypto.name}
                    </td> */}
                    <td className="py-4 px-6">{crypto.symbol.toUpperCase()}</td>
                    <td className="py-4 px-6">
                      ${crypto.current_price.toLocaleString()}
                    </td>
                    <td
                      className={`py-4 px-6 ${
                        crypto.price_change_percentage_24h > 0
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {crypto.price_change_percentage_24h.toFixed(2)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default CryptoTable;
