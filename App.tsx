import { TextInput, SafeAreaView, StyleSheet, Text, View } from "react-native";
import MyButton from "./components/MyButton";
import { useEffect, useState } from "react";
import { API_KEY } from "@env";
//import { apikey } from "./config/apicfg";
import { FilterOption } from "./config/types";
import { DropDown } from "./components/DropDown";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCurrencies } from "./useCurrencies";

export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [fromCurrency, setFromCurrency] = useState<FilterOption | null>(null);
  const [toCurrency, setToCurrency] = useState<FilterOption | null>(null);
  const [number, setNumber] = useState("");
  const [convertedDate, setConvertedDate] = useState("");
  const [convertedAmount, setConvertedAmount] = useState("");
  const [titleAmount, setTitleAmount] = useState("Amount");

  //  const urlDataCurrencies = "https://api.currencyapi.com/v3/currencies";
  const urlConvCurrencies = "https://api.currencyapi.com/v3/latest";
  // const { currencies, isLoadingCurr } = useCurrencies(); // Hook
  // const { currencies, isLoadingCurr } = useExchCurrencies(); // Hook

  useEffect(() => {
    getData();
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

  const storeData = async (value: object) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("UID001", jsonValue);
    } catch (e) {
      // saving error
    }
  };
  const getData = async () => {
    try {
      const jsonRes = await AsyncStorage.getItem("UID001");
      if (jsonRes) {
        const resultData = JSON.parse(jsonRes);
        setFromCurrency(resultData["fromCurrencyS"]["fromCurrency"]);
        setTitleAmount(
          "Amount (" +
            `${resultData["fromCurrencyS"]["fromCurrency"]["key"]}` +
            ")"
        );
        setToCurrency(resultData["toCurrencyS"]["toCurrency"]);
        setNumber(resultData["numberS"]["number"]);
        setConvertedDate(resultData["convertedDateS"]["dateStr"]);
        setConvertedAmount(
          "Result: " +
            `${resultData["resultS"]["result"]}` +
            " (" +
            `${resultData["toCurrencyS"]["toCurrency"]["key"]}` +
            ")"
        );
      }
    } catch (e) {
      // error reading value
      console.log("Not AsyncStorage");
    }
  };
  const saveAsyncStorage = (dateStr: string, result: string) => {
    const resultData = {
      fromCurrencyS: { fromCurrency },
      toCurrencyS: { toCurrency },
      numberS: { number },
      convertedDateS: { dateStr },
      resultS: { result },
    };
    storeData(resultData);
  };

  const calculate = async () => {
    if (number != "") {
      const { data } = await getExchangeRate();

      if (toCurrency) {
        const result = +number * data[`${toCurrency.key}`]["value"];
        var convDate = new Date();
        saveAsyncStorage(convDate.toString(), result.toFixed(2));
        setConvertedDate(convDate.toString());
        setConvertedAmount(
          "Result: " + result.toFixed(2) + " (" + `${toCurrency["key"]}` + ")"
        );
      }
    }
  };

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
              // "cur_live_pzaSuuuoSWQrHo5MKykAsjnDjTgd3kHlXblNrOkj",
            },
          }
        );
        return response.json();
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
  };

  useEffect(() => {
    setConvertedDate("");
    setConvertedAmount("");
  }, [fromCurrency, toCurrency, number]);

  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>Currency converter</Text>
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
      <MyButton
        title="Convert"
        buttonStyles={styles.buttonStyle}
        textStyles={styles.textBtn}
        onPress={() => {
          calculate();
        }}
      />
      <Text>
        {"\n"}
        {convertedDate}{" "}
      </Text>
      <Text style={styles.textResult}>
        {"\n"}
        {convertedAmount}{" "}
      </Text>
    </View>
  );
}

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
