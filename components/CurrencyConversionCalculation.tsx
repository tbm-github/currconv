import { StyleSheet } from "react-native";
import MyButton from "./MyButton";
import { FilterOption } from "../config/types";
import { useGetExchangeRate } from "../useGetExchangeRate";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

type itemDataHistoryCurrencyConverion = {
  fromCurrency: FilterOption | null;
  toCurrency: FilterOption | null;
  value: string;
  dateStr: string;
  result: string;
};
type Props = {
  fromCurrency: FilterOption | null;
  toCurrency: FilterOption | null;
  value: string;
  onConvertedDate: (val: string) => void;
  onConvertedAmount: (val: string) => void;
};
const CurrencyConversionCalculation = ({
  fromCurrency,
  toCurrency,
  value,
  onConvertedDate,
  onConvertedAmount,
}: Props) => {
  const [
    arrayDataHistoryCurrencyConverion,
    setArrayDataHistoryCurrencyConverion,
  ] = useState<itemDataHistoryCurrencyConverion[]>([]);
  const { getExchangeRate, numberExchangeRate, runHookGetExchangeRate } =
    useGetExchangeRate(fromCurrency, toCurrency);
  const putDataAsyncStorage = async (resultData: object) => {
    try {
      const jsonValue = JSON.stringify(resultData);
      await AsyncStorage.setItem("UID001", jsonValue);
    } catch (e) {
      // saving error
    }
  };
  const putDataHistoryCurrencyConverionAsyncStorage = async (
    resultDataHistoryCurrencyConverion: object
  ) => {
    try {
      const jsonValue = JSON.stringify(resultDataHistoryCurrencyConverion);
      await AsyncStorage.setItem("HistoryCurrencyConverion", jsonValue);
    } catch (e) {
      // saving error
    }
  };
  const saveAsyncStorage = (dateStr: string, result: string) => {
    const resultData = {
      fromCurrency,
      toCurrency,
      value,
      dateStr,
      result,
    };
    putDataAsyncStorage(resultData);
    arrayDataHistoryCurrencyConverion.push(resultData);
    console.log(
      "arrayDataHistoryCurrencyConverion = ",
      arrayDataHistoryCurrencyConverion
    );
    arrayDataHistoryCurrencyConverion.map((itemDataHistory) =>
      console.log(itemDataHistory)
    );
    putDataHistoryCurrencyConverionAsyncStorage(
      arrayDataHistoryCurrencyConverion
    );
  };

  useEffect(() => {
    calculateSave();
  }, [runHookGetExchangeRate]);
  const startCalculate = () => {
    if (fromCurrency && toCurrency && value) {
      getExchangeRate();
    }
  };

  const calculateSave = () => {
    if (value != "" && !(typeof numberExchangeRate === "undefined")) {
      if (toCurrency) {
        // const result = +number * data[`${toCurrency.key}`]["value"];
        const result = +value * numberExchangeRate;
        var convDate = new Date();
        saveAsyncStorage(convDate.toString(), result.toFixed(2));
        onConvertedDate(convDate.toString());
        onConvertedAmount(
          "Result: " + result.toFixed(2) + " (" + `${toCurrency["key"]}` + ")"
        );
      }
    }
  };

  const getDataHistoryCurrencyConverionAsyncStorage = async () => {
    try {
      const jsonRes = await AsyncStorage.getItem("HistoryCurrencyConverion");
      if (jsonRes) {
        const resultDataArray = JSON.parse(jsonRes);
        setArrayDataHistoryCurrencyConverion(resultDataArray);
      }
    } catch (e) {
      // error reading value
      console.log("Not HistoryCurrencyConverion in AsyncStorage");
    }
  };
  useEffect(() => {
    getDataHistoryCurrencyConverionAsyncStorage();
  }, []);
  return (
    <MyButton
      title="Convert"
      buttonStyles={styles.btnStyle}
      textStyles={styles.btnText}
      onPress={() => {
        startCalculate();
      }}
    />
  );
};

const styles = StyleSheet.create({
  btnStyle: {
    color: "black",
    backgroundColor: "green",
    fontWeight: "bold",
  },
  btnText: {
    color: "white",
  },
});

export default CurrencyConversionCalculation;
