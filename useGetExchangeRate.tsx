import { useEffect, useState } from "react";
import { API_KEY } from "@env";
import { FilterOption } from "./config/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useGetExchangeRate = (
  dataFromCurrency: FilterOption | null,
  dataToCurrency: FilterOption | null
) => {
  const urlConvCurrencies = "https://api.currencyapi.com/v3/latest";
  const [fromCurrency, setFromCurrency] = useState<FilterOption | null>(
    dataFromCurrency
  );
  const [toCurrency, setToCurrency] = useState<FilterOption | null>(
    dataToCurrency
  );
  const [isLoading, setLoading] = useState(true);
  const [numberExchangeRate, setNumberExchangeRate] = useState();
  const [runHookGetExchangeRate, setRunHookGetExchangeRate] = useState(false);

  const getExchangeRate = async () => {
    if (dataFromCurrency && dataToCurrency)
      try {
        setLoading(true);
        const response = await fetch(
          urlConvCurrencies +
            "?base_currency=" +
            `${dataFromCurrency.key}` +
            "&currencies=" +
            `${dataToCurrency.key}`,
          {
            method: "GET",
            headers: {
              apikey: `${API_KEY}`,
            },
          }
        );
        const json = await response.json();
        setNumberExchangeRate(json.data[`${dataToCurrency.key}`]["value"]);
        setRunHookGetExchangeRate(!runHookGetExchangeRate);
        // return json.data[`${dataToCurrency.key}`]["value"];
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
  };

  return { getExchangeRate, numberExchangeRate, runHookGetExchangeRate };
};
