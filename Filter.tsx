import React from "react";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { DropDown } from "./components/DropDown";
import { FilterOption } from "./config/types";

type Props = {
  data: FilterOption[];
  onSelect: (text: string) => void;
};

export const Filter = (props: Props) => {
  const [selectValue, setSelectValue] = useState({ key: "", value: "" });

  const selected = (item: FilterOption) => {
    setSelectValue(item);
    props.onSelect(item.key);
  };

  return (
    <View style={styles.container}>
      <DropDown
        selectValue={selectValue}
        data={props.data}
        oneSelect={selected}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    width: "80%",
    marginLeft: "10%",
    borderWidth: 1,
  },
  input: {
    padding: 10,
    fontSize: 18,
    color: "black",
    textAlign: "left",

    width: "80%",
    borderWidth: 1,
  },
  btn: {
    alignItems: "center",
    fontSize: 18,
    color: "black",
    borderRadius: 3,
    backgroundColor: "red",
    borderWidth: 1,
  },
});
