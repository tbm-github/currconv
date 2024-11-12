import { Alert, Button, StyleSheet, Text, View } from "react-native";
// import { Provider } from "react-redux";
// import { store } from "./store/index";
import Converter from "./modules/converter";
import NumberInput from "./components/NumberInput";
import MyButton from "./components/MyButton";
import { useEffect, useState } from "react";
import { apikey } from "./config/apicfg";
import { FilterOption } from "./config/types";

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

export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [dataCurrencies, setDataCurrencies] = useState<CurrenciesData | null>(
    null
  );
  const [dataFilters, setDataFilters] = useState<FilterOption | null>(null);

  const url = "https://api.currencyapi.com/v3/currencies";

  const getDataCurrencies = async () => {
    try {
      const response = await fetch(url, {
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

  return (
    // <Provider store={store}>
    <View style={styles.container}>
      <Text>Currency converter!</Text>
      <Text>First currency </Text>
      <Converter data={currencyList} />
      <Text>Second currency </Text>
      <Converter data={currencyList} />
      <NumberInput />

      <MyButton
        title="Converter"
        buttonStyles={styles.buttonStyle}
        textStyles={styles.text}
        onPress={() => Alert.alert("MyButton Converter currency")}
      />
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
});
