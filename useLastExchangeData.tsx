import { useEffect, useState } from "react";
import { FilterOption } from "./config/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

type typeLastExchangeData = {
  setBaseCurrency: FilterOption | null;
  setConvCurrency: FilterOption | null;
  setNumber: string;
  setConvertedDate: string;
  setConvertedAmount: string;
};
export function useLastExchangeData() {
  const [baseCurrency, setBaseCurrency] = useState<FilterOption | null>(null);
  const [convCurrency, setConvCurrency] = useState<FilterOption | null>(null);
  const [number, setNumber] = useState("");
  const [convertedAmount, setConvertedAmount] = useState("");
  const [convertedDate, setConvertedDate] = useState("");
  const [lastExchangeData, setLastExchangeData] =
    useState<typeLastExchangeData | null>(null);
  const getData = async () => {
    try {
      const jsonRes = await AsyncStorage.getItem("UID001");
      if (jsonRes) {
        const resultData = JSON.parse(jsonRes);

        const tmpResultData = {
          setBaseCurrency: resultData["baseCurrencyS"]["baseCurrency"],
          setConvCurrency: resultData["convCurrencyS"]["convCurrency"],
          setNumber: resultData["numberS"]["number"],
          setConvertedDate: resultData["convertedDateS"]["dateStr"],
          setConvertedAmount: resultData["resultS"]["result"],
        };
        setLastExchangeData(tmpResultData);
      }
    } catch (e) {
      // error reading value
      console.log("Not AsyncStorage");
    }
  };
  useEffect(() => {
    const resultData = getData();
  }, []);
  return lastExchangeData;
}
