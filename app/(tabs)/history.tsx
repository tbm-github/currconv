import { View, Text, StyleSheet } from "react-native";
import { FlatListHistory } from "../../components/FlatListHistory";

export default function Tab() {
  return (
    <View style={styles.container}>
      <Text>Tab [Home|Settings]</Text>
      <FlatListHistory />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
