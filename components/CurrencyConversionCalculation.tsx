import { StyleSheet } from "react-native";
import MyButton from "./MyButton";
import { FilterOption } from "../config/types";
import { useGetExchangeRate } from "../useGetExchangeRate";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

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
  const saveAsyncStorage = (dateStr: string, result: string) => {
    const resultData = {
      fromCurrencyS: { fromCurrency },
      toCurrencyS: { toCurrency },
      numberS: { value },
      convertedDateS: { dateStr },
      resultS: { result },
    };
    putDataAsyncStorage(resultData);
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
