import React from "react";
import { useState } from "react";
import { ScrollView, View, Text, ActivityIndicator, Alert } from "react-native";
import { Filter } from "../../Filter";
import { FilterOption } from "../../config/types";

const Converter = () => {
  const data: FilterOption[] = [
    { key: "byn", value: "белорусский рубль" },
    { key: "rub", value: "российскпй рубль" },
    { key: "eur", value: "евро" },
    { key: "usd", value: "доллар США" },
  ];

  const [filter, setFilter] = useState("");
  const onSelect = (filter: string) => {
    setFilter(filter);
  };

  return (
    <View>
      <Filter data={data} onSelect={onSelect} />
    </View>
  );
};
export default Converter;
