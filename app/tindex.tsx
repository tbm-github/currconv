import { Link, Stack } from "expo-router";
import { Image, Text, View, StyleSheet } from "react-native";
import { FormCurrencyConversionMain } from "../components/FormCurrencyConversionMain";
import { CurrencyProvider } from "../contexts/currencyContext";

function LogoTitle() {
  return (
    <Image
      style={styles.image}
      source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
    />
  );
}

export default function Home() {
  return (
    <CurrencyProvider>
      <View style={styles.container}>
        <Stack.Screen
          options={{
            title: "Converter",
            headerStyle: { backgroundColor: "#f4511e" },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },

            // headerTitle: (props) => <LogoTitle {...props} />,
          }}
        />
        <FormCurrencyConversionMain />
      </View>
    </CurrencyProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 50,
    height: 50,
  },
});
