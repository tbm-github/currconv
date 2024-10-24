import React, { CSSProperties } from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from "react-native";

type Props = {
  disabled?: boolean;
  color?: string;
  title?: string;
  onPress(): void;
  buttonStyles?: StyleProp<ViewStyle>;
  textStyles?: StyleProp<TextStyle>;
  accessibilityLabel?: string;
};

const MyButton = ({
  disabled,
  color,
  title,
  onPress,
  buttonStyles,
  accessibilityLabel,
  textStyles,
}: Props) => {
  return (
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: disabled
            ? "#ccc"
            : pressed
            ? "#aa0000"
            : color || "blue",
        },
        styles.container,
        buttonStyles,
      ]}
      disabled={disabled}
      onPress={onPress}
      accessible
      accessibilityLabel={accessibilityLabel || "A Button"}
    >
      <Text style={[styles.buttonText, textStyles]}>{title || "Press Me"}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    alignItems: "center",
    borderRadius: 8,
  },
  buttonText: {
    color: "red",
  },
});

export default MyButton;
