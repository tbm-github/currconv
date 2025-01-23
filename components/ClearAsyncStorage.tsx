import { StyleSheet } from "react-native";
import MyButton from "./MyButton";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ClearAsyncStorage = () => {
  const clearAll = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      // clear error
    }

    console.log("Clear History. Done.");
  };
  return (
    <MyButton
      title="Clear History"
      buttonStyles={styles.btnStyle}
      textStyles={styles.btnText}
      onPress={() => {
        clearAll();
      }}
    />
  );
};

const styles = StyleSheet.create({
  btnStyle: {
    color: "black",
    backgroundColor: "red",
    fontWeight: "bold",
  },
  btnText: {
    color: "white",
  },
});

export default ClearAsyncStorage;
