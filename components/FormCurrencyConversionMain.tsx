import { TextInput, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useContext, useEffect, useReducer, useState } from "react";
import { API_KEY } from "@env";
import {
  FilterOption,
  itemDataCurrencyConversion,
  itemHistory,
} from "../config/types";
import { DropDown } from "./DropDown";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCurrencies } from "../useCurrencies";
import { useGetExchangeRate } from "../useGetExchangeRate";
import CurrencyConversionCalculation from "./CurrencyConversionCalculation";
import ClearAsyncStorage from "./ClearAsyncStorage";
import {
  CurrencyContext,
  HistoryConversionContext,
} from "../contexts/currencyContext";

type itemDataConversion = {
  fromCurrency: FilterOption | null;
  toCurrency: FilterOption | null;
  value: string;
  dateString: string;
  result: string;
};
type ActionSelectCurrency = {
  type: string;
  currency: FilterOption | null;
};
type ActionChangeValue = {
  type: string;
  value: string;
};
type ActionAmount = {
  type: string;
};
type ActionTypes = ActionSelectCurrency | ActionChangeValue | ActionAmount;

export const FormCurrencyConversionMain = () => {
  const [isLoading, setLoading] = useState(true);
  const { fromCurrency, setFromCurrency, toCurrency, setToCurrency } =
    useContext(CurrencyContext);
  const {
    // arrayDataHistoryCurrencyConversion,
    handleAddItemConversion,
    handleCreateConversion,
  } = useContext(HistoryConversionContext);

  const [number, setNumber] = useState("");
  const [convertedDate, setConvertedDate] = useState("");
  const [convertedAmount, setConvertedAmount] = useState("");
  const [titleAmount, setTitleAmount] = useState("Amount");

  const urlConvCurrencies = "https://api.currencyapi.com/v3/latest";

  useEffect(() => {
    getDataAsyncStorage();
  }, []);

  const currencyList = useCurrencies();

  const [filter, setFilter] = useState("");

  const onSelect = (filter: string) => {
    setFilter(filter);
  };

  const selectedFromCurrency = (item: FilterOption) => {
    setFromCurrency(item);
    setTitleAmount("Amount (" + `${item["key"]}` + ")");
    onSelect(item.key);
  };

  const selectedToCurrency = (item: FilterOption) => {
    setToCurrency(item);
    onSelect(item.key);
  };

  const onChangeNumber = (text: string) => {
    if (+text || text == "") setNumber(text);
  };

  const getDataAsyncStorage = async () => {
    try {
      //const jsonRes = await AsyncStorage.getItem("UID001");
      const jsonRes = await AsyncStorage.getItem("HistoryCurrencyConversion");
      if (jsonRes) {
        const resultData = JSON.parse(jsonRes);
        setFromCurrency(resultData[0]["fromCurrency"]);
        setTitleAmount(
          "Amount (" + `${resultData[0]["fromCurrency"]["key"]}` + ")"
        );
        setToCurrency(resultData[0]["toCurrency"]);
        setNumber(resultData[0]["value"]);
        setConvertedDate(resultData[0]["dateStr"]);
        setConvertedAmount(
          "Result: " +
            `${resultData[0]["result"]}` +
            " (" +
            `${resultData[0]["toCurrency"]["key"]}` +
            ")"
        );
        handleCreateConversion(resultData);
      }
    } catch (e) {
      // error reading value
      console.log("Not AsyncStorage");
    }
  };

  useEffect(() => {
    setConvertedDate("");
    setConvertedAmount("");
  }, [fromCurrency, toCurrency, number]);

  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>Currency Converter</Text>
      <Text>{"\n"}From</Text>
      <DropDown
        selectValue={fromCurrency}
        data={currencyList}
        oneSelect={selectedFromCurrency}
      />
      <Text>{"\n"}To</Text>
      <DropDown
        selectValue={toCurrency}
        data={currencyList}
        oneSelect={selectedToCurrency}
      />
      <Text>
        {"\n"}
        {titleAmount}
      </Text>
      <SafeAreaView>
        <TextInput
          style={styles.input}
          onChangeText={onChangeNumber}
          value={number}
          placeholder="enter number"
          keyboardType="numeric"
        />
      </SafeAreaView>
      <Text>{"\n"}</Text>
      <CurrencyConversionCalculation
        value={number}
        onConvertedDate={setConvertedDate}
        onConvertedAmount={setConvertedAmount}
      />
      <Text>
        {"\n"}
        {convertedDate}{" "}
      </Text>
      <Text style={styles.textResult}>
        {"\n"}
        {convertedAmount} {"\n"}
      </Text>
      <ClearAsyncStorage />
    </View>
  );
};

const conversionReducer = (
  dataConversion: itemDataConversion,
  action: string
) => {};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  textTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "blue",
  },
  buttonStyle: {
    color: "black",
    backgroundColor: "green",
    fontWeight: "bold",
  },
  textBtn: {
    color: "white",
  },
  input: {
    minHeight: 40,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 200,
    padding: 5,
    borderWidth: 1,
  },
  textResult: {
    fontSize: 14,
    fontWeight: "bold",
    color: "navy",
  },
});
