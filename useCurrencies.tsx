import { useEffect, useState } from "react";
import { API_KEY } from "@env";

type Currency = {
  symbol: string;
  name: string;
  symbol_native: string;
  decimal_digits: number;
  rounding: number;
  code: string;
  name_plural: string;
  type: string;
  countries: string[];
};
type CurrenciesData = { [key: string]: Currency };

export function useCurrencies() {
  const urlDataCurrencies = "https://api.currencyapi.com/v3/currencies";
  const [isLoading, setLoading] = useState(true);

  const [dataCurrencies, setDataCurrencies] = useState<CurrenciesData | null>(
    null
  );

  const getDataCurrencies = async () => {
    try {
      setLoading(true);
      const response = await fetch(urlDataCurrencies, {
        method: "GET",
        headers: {
          apikey: `${API_KEY}`,
          // "cur_live_pzaSuuuoSWQrHo5MKykAsjnDjTgd3kHlXblNrOkj",
          // apikey: "cur_live_EPhQajklAhcd3Xbc8MihbSuQnyn8tyA73rDEU0lB",
        },
      });
      const json = await response.json();
      setDataCurrencies(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDataCurrencies();
  }, []);

  let currencyList = [];
  if (dataCurrencies) {
    for (var key in dataCurrencies) {
      currencyList.push({ key: key, value: dataCurrencies[key]["name"] });
    }
    currencyList.sort(function (a, b) {
      return a.value > b.value ? 1 : -1;
    });
  }

  return currencyList;
}
