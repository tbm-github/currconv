import {
  Alert,
  TextInput,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
// import { Provider } from "react-redux";
// import { store } from "./store/index";
import Converter from "./modules/converter";
import NumberInput from "./components/NumberInput";
import MyButton from "./components/MyButton";
import { useEffect, useState } from "react";
import { apikey } from "./config/apicfg";
import { FilterOption } from "./config/types";
import { Filter } from "./Filter";
import { DropDown } from "./components/DropDown";

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
      const response = await fetch(urlDataCurrencies, {
        method: "GET",
        headers: {
          apikey: "cur_live_EPhQajklAhcd3Xbc8MihbSuQnyn8tyA73rDEU0lB",
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
  }, []);
  let currencyList = [];
  if (dataCurrencies) {
    console.log(Object.keys(dataCurrencies));
    console.log(dataCurrencies["USD"]);

    for (var key in dataCurrencies) {
      console.log(key, dataCurrencies[key]["name"]);
      currencyList.push({ key: key, value: dataCurrencies[key]["name"] });
    }
    console.log(currencyList);
    //setDataFilters(currencyList);
  }
  const [baseCurrency, setBaseCurrency] = useState({ key: "", value: "" });
  const [convCurrency, setConvCurrency] = useState({ key: "", value: "" });

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

  const [number, setNumber] = useState(0);
  const onChangeNumber = (text: string) => {
    if (+text || text == "") setNumber(+text);
  };

  const getConvCurrencies = async () => {
    try {
      const response = await fetch(
        urlConvCurrencies +
          "?base_currency=" +
          `${baseCurrency.key}` +
          "&currencies=" +
          `${convCurrency.key}`,
        {
          method: "GET",
          headers: {
            apikey: "cur_live_EPhQajklAhcd3Xbc8MihbSuQnyn8tyA73rDEU0lB",
          },
        }
      );
      const json = await response.json();
      setDataExchangeRate(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getConvCurrencies();
  }, [number]);

  const [convertedAmount, setConvertedAmount] = useState("");
  if (dataExchangeRate) {
    console.log(dataExchangeRate);
    console.log(dataExchangeRate[`${convCurrency.key}`]);
    if (dataExchangeRate[`${convCurrency.key}`]) {
      const result = number * dataExchangeRate[`${convCurrency.key}`]["value"];
      console.log(result);
      // setConvertedAmount(result.toFixed(2));
    }

    //setResult(dataExchangeRate[`${convCurrency.key}`]["value"] * number);
    // console.log(result);
  }
  return (
    // <Provider store={store}>
    <View style={styles.container}>
      <Text>Currency converter!</Text>
      <Text>First currency </Text>
      {/* <Converter data={currencyList} /> */}
      {/* <Filter data={currencyList} onSelect={onSelect} /> */}
      <DropDown
        selectValue={baseCurrency}
        data={currencyList}
        oneSelect={selectedBaseCurr}
      />
      <Text>Second currency </Text>
      <DropDown
        selectValue={convCurrency}
        data={currencyList}
        oneSelect={selectedConvCurr}
      />
      {/* <NumberInput /> */}
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
          Alert.alert(
            `MyButton Converter currency ${baseCurrency.key} to ${convCurrency.key}`
          );
        }}
      />
      <Text>Result </Text>
    </View>
    // </Provider>
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
    color: "green",
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
