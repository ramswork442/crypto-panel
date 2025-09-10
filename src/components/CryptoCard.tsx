import type { CryptoData } from "../services/CryptoService";

interface CryptoCardProps {
  crypto: CryptoData;
}

const CryptoCard: React.FC<CryptoCardProps> = ({ crypto }) => {
  const isPositive = crypto.price_change_percentage_24h >= 0;

  return (
    <div className="bg-black border-2 border-purple-600 p-5 rounded-xl shadow-lg hover:shadow-purple-500/70 transition-shadow duration-300 transform">
      <h2 className="text-xl font-bold text-white mb-3 text-center">{crypto.name}</h2>
      <p className="text-gray-400 mb-2 text-center">
        Price: <span className="text-white font-semibold">${crypto.current_price.toLocaleString()}</span>
      </p>
      <p className={`text-center font-semibold ${isPositive ? "text-green-400" : "text-red-400"}`}>
        24hrs Change: {crypto.price_change_percentage_24h.toFixed(2)}%
      </p>
    </div>
  );
};

export default CryptoCard;
