import { TextInput, SafeAreaView, StyleSheet, Text, View } from "react-native";
import MyButton from "./components/MyButton";
import { useEffect, useState } from "react";
import { API_KEY } from "@env";
//import { apikey } from "./config/apicfg";
import { FilterOption } from "./config/types";
import { DropDown } from "./components/DropDown";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCurrencies } from "./useCurrencies";

type ExchangeRate = {
  code: string;
  value: number;
};
type ExchangeRateData = { [key: string]: ExchangeRate };

export default function App() {
  const [isLoading, setLoading] = useState(true);

  const [dataExchangeRate, setDataExchangeRate] =
    useState<ExchangeRateData | null>(null);

  //  const urlDataCurrencies = "https://api.currencyapi.com/v3/currencies";
  const urlConvCurrencies = "https://api.currencyapi.com/v3/latest";
  // const { currencies, isLoadingCurr } = useCurrencies(); // Hook
  // const { currencies, isLoadingCurr } = useExchCurrencies(); // Hook

  useEffect(() => {
    getData();
  }, []);
  const currencyList = useCurrencies();

  const [baseCurrency, setBaseCurrency] = useState<FilterOption | null>(null);
  const [convCurrency, setConvCurrency] = useState<FilterOption | null>(null);

  const [filter, setFilter] = useState("");

  const onSelect = (filter: string) => {
    setFilter(filter);
  };
  const selectedBaseCurr = (item: FilterOption) => {
    setBaseCurrency(item);
    onSelect(item.key);
  };
  const selectedConvCurr = (item: FilterOption) => {
    setConvCurrency(item);
    onSelect(item.key);
  };

  const [number, setNumber] = useState("");
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
        setBaseCurrency(resultData["baseCurrencyS"]["baseCurrency"]);
        setConvCurrency(resultData["convCurrencyS"]["convCurrency"]);
        setNumber(resultData["numberS"]["number"]);
        setConvertedDate(resultData["convertedDateS"]["dateStr"]);
        setConvertedAmount(resultData["resultS"]["result"]);
      }
    } catch (e) {
      // error reading value
      console.log("Not AsyncStorage");
    }
  };
  const saveAsyncStorage = (dateStr: string, result: string) => {
    const resultData = {
      baseCurrencyS: { baseCurrency },
      convCurrencyS: { convCurrency },
      numberS: { number },
      convertedDateS: { dateStr },
      resultS: { result },
    };
    storeData(resultData);
  };

  const [convertedAmount, setConvertedAmount] = useState("");
  const [convertedDate, setConvertedDate] = useState("");

  const calculate = async () => {
    if (number != "") {
      const { data } = await getConvCurrencies();

      if (convCurrency) {
        const result = +number * data[`${convCurrency.key}`]["value"];
        setDataExchangeRate(data);
        var convDate = new Date();
        saveAsyncStorage(convDate.toString(), result.toFixed(2));
        setConvertedDate(convDate.toString());
        setConvertedAmount(result.toFixed(2));
      }
    }
  };

  const getConvCurrencies = async () => {
    if (baseCurrency)
      try {
        setLoading(true);
        const response = await fetch(
          urlConvCurrencies + "?base_currency=" + `${baseCurrency.key}`,
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
  }, [baseCurrency, convCurrency, number]);

  return (
    <View style={styles.container}>
      <Text>Currency converter!</Text>
      <Text>Base currency </Text>
      <DropDown
        selectValue={baseCurrency}
        data={currencyList}
        oneSelect={selectedBaseCurr}
      />
      <Text>Currency </Text>
      <DropDown
        selectValue={convCurrency}
        data={currencyList}
        oneSelect={selectedConvCurr}
      />
      <Text>Amount</Text>
      <SafeAreaView>
        <TextInput
          style={styles.input}
          onChangeText={onChangeNumber}
          value={number}
          placeholder="enter number"
          keyboardType="numeric"
        />
      </SafeAreaView>
      <MyButton
        title="Converter"
        buttonStyles={styles.buttonStyle}
        textStyles={styles.text}
        onPress={() => {
          calculate();
        }}
      />
      <Text>{convertedDate} </Text>
      <Text>{convertedAmount} </Text>
      {/* <Modal active={modalActive} setActive={setModalActive} /> */}
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
  buttonStyle: {
    color: "#fff",
    backgroundColor: "gray",
    fontWeight: "bold",
  },
  text: {
    color: "yellow",
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
});
