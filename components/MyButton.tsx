import { ReactNode } from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from "react-native";

type Props = {
  disabled?: boolean;
  color?: string;
  children?: ReactNode;
  onPress(): void;
  buttonStyles?: StyleProp<ViewStyle>;
  textStyles?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
};

const MyButton = ({
  disabled,
  color,
  children,
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
            : color || "red",
        },
        styles.container,
        buttonStyles,
      ]}
      disabled={disabled}
      onPress={onPress}
      accessible
      accessibilityLabel={accessibilityLabel || "A Button"}
    >
      <Text style={[styles.buttonText, textStyles]}>
        {children || "Press Me"}
      </Text>
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
    color: "whhite",
  },
});

export default MyButton;
