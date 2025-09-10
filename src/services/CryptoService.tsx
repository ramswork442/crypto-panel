import axios from "axios";

// take ref from coingecko documentation --
const BASE_URL = "https://api.coingecko.com/api/v3";

export interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
}

// take guide from documentation --
export const fetchCryptoData = async (): Promise<CryptoData[]> =>{
    try {
        const response = await axios.get(`${BASE_URL}/coins/markets`, {
            params: {
              vs_currency: "usd",
              ids: "bitcoin,ethereum,dogecoin",
              order: "market_cap_desc",
              per_page: 3,
              page: 1,
              price_change_percentage: "24h",
            },
          });
          return response.data;
    } catch (error) {
        console.error("Error fetching crypto data:", error);
        return [];
    }
}