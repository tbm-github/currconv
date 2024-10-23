import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Images } from "../config/constants";
import { FilterOption } from "../config/types";

type Props = {
  data: FilterOption[];
  selectValue: FilterOption;
  oneSelect: (val: FilterOption) => void;
};
export const DropDown = ({ data, selectValue, oneSelect }: Props) => {
  const [option, setOption] = React.useState(false);

  const selectOption = () => {
    setOption(!option);
  };

  const oneSelectItem = (val: FilterOption) => {
    setOption(false);
    oneSelect(val);
  };
  return (
    <View>
      <TouchableOpacity style={styles.dropDownStyle} onPress={selectOption}>
        <Text>
          {selectValue.value != "" ? selectValue.value : "Choose Option"}
        </Text>
        <Image
          source={Images.arrow_drop_down}
          style={{
            transform: [{ rotate: option ? "180deg" : "0deg" }],
          }}
        ></Image>
      </TouchableOpacity>

      {option && (
        <View style={styles.openDropDown}>
          {data.map((val) => {
            return (
              <TouchableOpacity
                key={val.key}
                onPress={() => oneSelectItem(val)}
                style={{
                  ...styles.optionName,
                  backgroundColor:
                    val.key === selectValue.key ? "pink" : "white",
                }}
              >
                <Text>{val.value}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {},
  dropDownStyle: {
    minHeight: 40,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 200,
    padding: 5,
    borderWidth: 1,
  },
  openDropDown: {
    backgroundColor: "gray",
    padding: 10,
    marginVertical: 5,
    zIndex: 1,
  },
  optionName: {
    margin: 5,
    padding: 10,
    borderRadius: 4,
    borderWidth: 1,
  },
  openModal: {
    marginTop: 10,
    backgroundColor: "gray",
    width: "80%",
    marginLeft: "10%",
  },
});
