import { useContext, useEffect } from "react";
import { HistoryConversionContext } from "../contexts/currencyContext";
import {
  FlatList,
  SafeAreaView,
  View,
  StyleSheet,
  StatusBar,
} from "react-native";
import { Text } from "react-native";
import ClearAsyncStorage from "./ClearAsyncStorage";

export const FlatListHistory = () => {
  const { arrayDataHistoryCurrencyConversion } = useContext(
    HistoryConversionContext
  );

  type ItemProps = { title: string };

  const Item = ({ title }: ItemProps) => {
    return (
      <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={arrayDataHistoryCurrencyConversion}
        renderItem={({ item, index }) => (
          <Item
            title={
              index +
              1 +
              ". " +
              item.dateStr +
              " : " +
              item.value +
              " " +
              item.fromCurrency?.key +
              " = " +
              item.result +
              " " +
              item.toCurrency?.key
            }
          />
        )}
        keyExtractor={(item) => item.dateStr}
      />
      <ClearAsyncStorage />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 2,
    marginVertical: 1,
    marginHorizontal: 2,
  },
  title: {
    fontSize: 12,
  },
});
