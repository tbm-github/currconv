import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import ModalDropdown from "react-native-modal-dropdown";
import { styles } from "./Style";

const App = () => {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [currencies, setCurrencies] = useState([]);
  const [convertedAmount, setConvertedAmount] = useState(null);

  const convertCurrency = useCallback(() => {
    if (!amount) {
      setConvertedAmount(null);
      return;
    }
    fetch(`
    https://api.exchangerate-api.com/v4/latest/${fromCurrency}
            `)
      .then((response) => response.json())
      .then((data) => {
        const exchangeRates = data.rates;
        const conversionRate = exchangeRates[toCurrency];

        if (conversionRate) {
          const result = parseFloat(amount) * conversionRate;
          setConvertedAmount(result.toFixed(2));
        } else {
          setConvertedAmount("Invalid Currency ");
        }
      })
      .catch((error) => {
        console.error("Error converting currency: ", error);
      });
  }, [amount, fromCurrency, toCurrency]);

  useEffect(() => {
    fetch(`
    https://api.exchangerate-api.com/v4/latest/USD
        `)
      .then((response) => response.json())
      .then((data) => {
        const currencyList = Object.keys(data.rates);
        setCurrencies(currencyList);
      })
      .catch((error) => {
        console.error(" Error fetching currency data: ", error);
      });
  }, []);

  useEffect(() => {
    convertCurrency();
  }, [convertCurrency]);

  const swapCurrencies = () => {
    // Swap the selected currencies
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <View style={styles.container}>
      <View style={styles.subcontainer}>
        <Text style={styles.header}>Currency Converter</Text>
        <Text style={styles.label}>Amount:</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={amount}
            onChangeText={(text) => setAmount(text)}
            keyboardType="numeric"
            placeholder="Enter amount"
            placeholderTextColor="#999"
          />
        </View>
        <Text style={styles.label}>From Currency:</Text>
        <View style={styles.inputContainer}>
          <ModalDropdown
            style={styles.dropdown}
            options={currencies}
            defaultValue={fromCurrency}
            onSelect={(index, value) => setFromCurrency(value)}
          />
        </View>
        <TouchableOpacity style={styles.swapButton} onPress={swapCurrencies}>
          <Text style={styles.swapButtonText}>&#8646;</Text>
        </TouchableOpacity>
        <Text style={styles.label}>To Currency:</Text>
        <View style={styles.inputContainer}>
          <ModalDropdown
            style={styles.dropdown}
            options={currencies}
            defaultValue={toCurrency}
            onSelect={(index, value) => setToCurrency(value)}
          />
        </View>

        <TouchableOpacity
          style={styles.convertButton}
          onPress={convertCurrency}
        >
          <Text style={styles.convertButtonText}>Convert</Text>
        </TouchableOpacity>

        {convertedAmount !== null && (
          <Text style={styles.result}>
            {amount} {fromCurrency} is
            {convertedAmount} {toCurrency}
          </Text>
        )}
      </View>
    </View>
  );
};

export default App;
