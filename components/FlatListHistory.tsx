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
import { itemDataCurrencyConversion } from "../config/types";

export const FlatListHistory = () => {
  const {
    saveHistory,
    setSaveHistory,
    arrayDataHistoryCurrencyConversion,
    handleAddItemConversion,
  } = useContext(HistoryConversionContext);

  useEffect(() => {
    console.log("History", arrayDataHistoryCurrencyConversion);
  }, []);

  type ItemProps = { title: string };

  const Item = ({ title }: ItemProps) => {
    console.log("title" + title);
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
        renderItem={({ item }) => <Item title={item.result} />}
        keyExtractor={(item) => item.dateStr}
      />
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
