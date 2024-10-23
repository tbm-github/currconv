import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

const Converter = () => {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        {/* <Button title={"-"} onPress={() => dispatch(decrement())} /> */}
      </View>

      <View style={[styles.box, { backgroundColor: "white" }]}>
        <Text numberOfLines={1} style={styles.text}>
          {/* {counter} */}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "gray",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 80,
  },
  box: {
    backgroundColor: "yellow",
    width: "30%",
    height: 60,
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 15,
    justifyContent: "center",
  },
  text: {
    color: "black",
    textAlign: "center",
    fontSize: 20,
  },
});

export default Converter;
