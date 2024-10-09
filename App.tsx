import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
// import { store } from "./store/index";
import Converter from "./converter";
import NumberInput from "./components/NumberInput";

export default function App() {
  return (
    // <Provider store={store}>
    <View style={styles.container}>
      <Text>Currency converter!</Text>
      <Text>First currency </Text>
      <NumberInput />
      <Converter />
      <Text>Second currency </Text>
      <NumberInput />
      <Converter />
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
});
