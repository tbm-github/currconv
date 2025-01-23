import { StyleSheet } from "react-native";
import MyButton from "./MyButton";
import { FilterOption } from "../config/types";
import { useGetExchangeRate } from "../useGetExchangeRate";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useEffect, useState } from "react";
import {
  CurrencyContext,
  HistoryConversionContext,
} from "../contexts/currencyContext";

// type itemDataHistoryCurrencyConversion = {
//   fromCurrency: FilterOption | null;
//   toCurrency: FilterOption | null;
//   value: string;
//   dateStr: string;
//   result: string;
// };
type Props = {
  value: string;
  onConvertedDate: (val: string) => void;
  onConvertedAmount: (val: string) => void;
};
const CurrencyConversionCalculation = ({
  value,
  onConvertedDate,
  onConvertedAmount,
}: Props) => {
  const { fromCurrency, toCurrency } = useContext(CurrencyContext);
  const {
    saveHistory,
    setSaveHistory,
    arrayDataHistoryCurrencyConversion,
    handleAddItemConversion,
  } = useContext(HistoryConversionContext);

  const { getExchangeRate } = useGetExchangeRate();

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
      fromCurrency,
      toCurrency,
      value,
      dateStr,
      result,
    };

    // putDataAsyncStorage(resultData);
    handleAddItemConversion(resultData);
    putDataHistoryCurrencyConversionAsyncStorage([
      resultData,
      ...arrayDataHistoryCurrencyConversion,
    ]);
  };

  const putDataHistoryCurrencyConversionAsyncStorage = async (
    resultDataHistoryCurrencyConversion: object
  ) => {
    try {
      const jsonValue = JSON.stringify(resultDataHistoryCurrencyConversion);
      await AsyncStorage.setItem("HistoryCurrencyConversion", jsonValue);
      console.log(
        "putDataHistoryCurrencyConversionAsyncStorage",
        resultDataHistoryCurrencyConversion
      );
    } catch (e) {
      // saving error
    }
  };

  useEffect(() => {
    if (saveHistory)
      putDataHistoryCurrencyConversionAsyncStorage(
        arrayDataHistoryCurrencyConversion
      );
    console.log(
      "HistoryCurrencyConversion",
      arrayDataHistoryCurrencyConversion
    );
  }, [arrayDataHistoryCurrencyConversion]);

  const startCalculate = () => {
    if (fromCurrency && toCurrency && value) {
      setSaveHistory(true);
      getExchangeRate().then((rate: number) => {
        calculateSave(rate);
      });
    }
  };

  const calculateSave = (rate: number) => {
    if (value != "" && rate) {
      if (toCurrency) {
        const result = +value * rate;
        var convDate = new Date();
        saveAsyncStorage(convDate.toString(), result.toFixed(2));
        onConvertedDate(convDate.toString());
        onConvertedAmount(
          "Result: " + result.toFixed(2) + " (" + `${toCurrency["key"]}` + ")"
        );
      }
    }
  };

  //   const getDataHistoryCurrencyConversionAsyncStorage = async () => {
  //     try {
  //       const jsonRes = await AsyncStorage.getItem("HistoryCurrencyConversion");
  //       if (jsonRes) {
  //         const resultDataArray = JSON.parse(jsonRes);
  //         setArrayDataHistoryCurrencyConversion(resultDataArray);
  //       }
  //     } catch (e) {
  //       // error reading value
  //       console.log("Not HistoryCurrencyConversion in AsyncStorage");
  //     }
  //   };
  //   useEffect(() => {
  //     getDataHistoryCurrencyConversionAsyncStorage();
  //   }, []);
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
