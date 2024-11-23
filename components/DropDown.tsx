import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Images } from "../config/constants";
import { FilterOption } from "../config/types";
import { Button, Overlay } from "@rneui/base";

type Props = {
  data: FilterOption[];
  selectValue: FilterOption | null;
  oneSelect: (val: FilterOption) => void;
};
export const DropDown = ({ data, selectValue, oneSelect }: Props) => {
  const [option, setOption] = useState(false);

  const selectOption = () => {
    setOption(!option);
  };

  const oneSelectItem = (val: FilterOption) => {
    setOption(false);
    oneSelect(val);
    toggleOverlay();
  };

  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setOption(!option);
  };

  return (
    <View>
      <TouchableOpacity style={styles.dropDownStyle} onPress={selectOption}>
        <Text>
          {
            selectValue ? selectValue.value : "Choose Currency"
            // selectValue.value != "" ? selectValue.value : "Choose Currency"
          }
        </Text>
        <Image
          source={Images.arrow_drop_down}
          style={{
            transform: [{ rotate: option ? "180deg" : "0deg" }],
          }}
        ></Image>
      </TouchableOpacity>

      {option && (
        <Overlay isVisible={option} onBackdropPress={toggleOverlay}>
          <View style={styles.openDropDown}>
            <ScrollView style={styles.scrollView}>
              {data
                ? data.map((val) => {
                    return (
                      <TouchableOpacity
                        key={val.key}
                        onPress={() => oneSelectItem(val)}
                        style={{
                          ...styles.optionName,
                          backgroundColor: selectValue
                            ? val.key === selectValue.key
                              ? "pink"
                              : "white"
                            : "white",
                        }}
                      >
                        <Text>{val.value}</Text>
                      </TouchableOpacity>
                    );
                  })
                : null}
            </ScrollView>
          </View>
        </Overlay>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    flex: 1,
    justifyContent: "space-between",
    padding: 20,
    margin: 10,
  },
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
    backgroundColor: "beige",
    height: 400,
  },
  optionName: {
    margin: 5,
    padding: 10,
    borderRadius: 4,
    borderWidth: 1,
  },
  scrollView: {
    marginHorizontal: 10,
  },
});
