import { View, Text, StyleSheet } from "react-native";
import { FormCurrencyConversionMain } from "../../components/FormCurrencyConversionMain";
import { CurrencyProvider } from "../../contexts/currencyContext";
import { FlatListHistory } from "../../components/FlatListHistory";

export default function Tab() {
  return (
    // <CurrencyProvider>
    <View style={styles.container}>
      <Text>Tab [Home|Settings]</Text>
      <FormCurrencyConversionMain />
    </View>
    // </CurrencyProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
