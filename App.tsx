import { TextInput, SafeAreaView, StyleSheet, Text, View } from "react-native";
import MyButton from "./components/MyButton";
import { useEffect, useState } from "react";
import { apikey } from "./config/apicfg";
import { FilterOption } from "./config/types";
import { DropDown } from "./components/DropDown";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

type ExchangeRate = {
  code: string;
  value: number;
};
type ExchangeRateData = { [key: string]: ExchangeRate };

type ChoiseCurrency = {
  key: string;
  value: string;
};

export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [dataCurrencies, setDataCurrencies] = useState<CurrenciesData | null>(
    null
  );
  const [dataExchangeRate, setDataExchangeRate] =
    useState<ExchangeRateData | null>(null);

  const urlDataCurrencies = "https://api.currencyapi.com/v3/currencies";
  const urlConvCurrencies = "https://api.currencyapi.com/v3/latest";

  const getDataCurrencies = async () => {
    try {
      setLoading(true);
      const response = await fetch(urlDataCurrencies, {
        method: "GET",
        headers: {
          apikey: apikey,
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
    getData();
  }, []);

  let currencyList = [];
  if (dataCurrencies) {
    for (var key in dataCurrencies) {
      currencyList.push({ key: key, value: dataCurrencies[key]["name"] });
    }
  }
  const [baseCurrency, setBaseCurrency] = useState<ChoiseCurrency | null>(null);
  const [convCurrency, setConvCurrency] = useState<ChoiseCurrency | null>(null);

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

  const calculate = () => {
    if (number != "") getConvCurrencies();
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
              apikey: apikey,
              // "cur_live_pzaSuuuoSWQrHo5MKykAsjnDjTgd3kHlXblNrOkj",
            },
          }
        );
        const json = await response.json();
        setDataExchangeRate(json.data);
        if (convCurrency) {
          const result = +number * json.data[`${convCurrency.key}`]["value"];

          var convDate = new Date();
          saveAsyncStorage(convDate.toString(), result.toFixed(2));
          setConvertedDate(convDate.toString());
          setConvertedAmount(result.toFixed(2));
        }
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
