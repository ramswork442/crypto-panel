import { useState, useEffect } from "react";

// services --
import { fetchCryptoData } from "./services/CryptoService";
import type { CryptoData } from "./services/CryptoService";

// components --
import CryptoCard from "./components/CryptoCard";
import BitcoinChart from "./components/BitcoinChart";
import { Menu } from "lucide-react";

const App = () => {
  const [cryptos, setCryptos] = useState<CryptoData[]>([]);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchCryptoData();
      setCryptos(data);
      console.log(data)
    };

    getData();
    const interval = setInterval(getData, 30000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-950 p-6">
      <header className="shadow-md mb-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-purple-600 hover:text-purple-800 text-3xl md:text-4xl font-bold underline">
            Crypto Panel
          </div>

          <nav className="hidden md:flex space-x-6 text-gray-300">
            <a href="/" className="hover:text-purple-400 transition-colors">
              Home
            </a>
            <a href="/" className="hover:text-purple-400 transition-colors">
              About
            </a>
          </nav>

          <div className="md:hidden text-purple-400 cursor-pointer">
          <Menu height={25} width={25} />
            </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto">

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        {cryptos.map((crypto) => (
          <CryptoCard key={crypto.id} crypto={crypto} />
        ))}
      </div>

      <BitcoinChart />
      </main>
    </div>
  );
};

export default App;
