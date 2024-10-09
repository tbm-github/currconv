import React from "react";
import { SafeAreaView, StyleSheet, TextInput } from "react-native";

const NumberInput = () => {
  const [text, setNumber] = React.useState("");
  const onChangeNumber = (text: string) => {
    // if (/^\d+(\.\d+)?|^$$/.test(text))
    if (+text || text == "") setNumber(text);
  };
  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={text}
        placeholder="enter number"
        keyboardType="numeric"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    minHeight: 40,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 200,
    padding: 5,
    borderWidth: 1,
  },
});

export default NumberInput;
