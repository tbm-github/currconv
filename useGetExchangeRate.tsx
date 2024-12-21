import { useContext, useEffect, useState } from "react";
import { API_KEY } from "@env";
import { CurrencyContext } from "./contexts/currencyContext";

export const useGetExchangeRate = () => {
  const { fromCurrency, toCurrency } = useContext(CurrencyContext);
  const urlConvCurrencies = "https://api.currencyapi.com/v3/latest";
  const [isLoading, setLoading] = useState(true);

  const getExchangeRate = async () => {
    if (fromCurrency && toCurrency)
      try {
        setLoading(true);
        const response = await fetch(
          urlConvCurrencies +
            "?base_currency=" +
            `${fromCurrency.key}` +
            "&currencies=" +
            `${toCurrency.key}`,
          {
            method: "GET",
            headers: {
              apikey: `${API_KEY}`,
            },
          }
        );
        const json = await response.json();
        return json.data[`${toCurrency.key}`]["value"];
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
  };

  return { getExchangeRate };
};
