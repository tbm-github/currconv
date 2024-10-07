import { StyleSheet, Text, View } from "react-native";
import Converter from "./converter";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Currency converter!</Text>
      <Text>First currency </Text>
      <Converter />
      <Text>Second currency </Text>
      <Converter />
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
});
