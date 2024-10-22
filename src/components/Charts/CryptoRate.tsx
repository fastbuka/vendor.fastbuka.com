"use client";
import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";

// Define the structure of our API response
interface CryptoRate {
  usd: number;
}

interface CryptoData {
  usdc: CryptoRate;
  stellar: CryptoRate;
}

const CryptoRate: React.FC = () => {
  const [cryptoData, setCryptoData] = useState<CryptoData | null>(null);

  // Fetch crypto prices from CoinGecko API
  const fetchCryptoRates = async () => {
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=usd-coin,stellar&vs_currencies=usd"
      );
      const data = await response.json();
      setCryptoData({
        usdc: data["usd-coin"],
        stellar: data["stellar"],
      });
    } catch (error) {
      console.error("Error fetching crypto rates:", error);
    }
  };

  useEffect(() => {
    // Fetch the data initially and then every 60 seconds
    fetchCryptoRates();
    const interval = setInterval(fetchCryptoRates, 60000);

    return () => clearInterval(interval); // Clear the interval when component unmounts
  }, []);

  return (
    <div className="bg-gray-800 text-white">
      {cryptoData ? (
        <Marquee speed={50} gradient={false}>
          <div className="flex gap-5">
            <span>Current Exchange Rate</span>
            <span>USDC: ${cryptoData.usdc.usd.toFixed(4)}</span>
            <span>XLM: ${cryptoData.stellar.usd.toFixed(4)}</span>
          </div>
        </Marquee>
      ) : (
        <p className="text-black">Loading crypto rates...</p>
      )}
    </div>
  );
};

export default CryptoRate;
