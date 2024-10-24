import { Alert, Button, StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
// import { store } from "./store/index";
import Converter from "./modules/converter";
import NumberInput from "./components/NumberInput";
import MyButton from "./components/MyButton";

export default function App() {
  return (
    // <Provider store={store}>
    <View style={styles.container}>
      <Text>Currency converter!</Text>
      <Text>First currency </Text>
      <Converter />
      <Text>Second currency </Text>
      <Converter />
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
