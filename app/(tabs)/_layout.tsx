import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { CurrencyProvider } from "../../contexts/currencyContext";

export default function TabLayout() {
  return (
    <CurrencyProvider>
      <Tabs screenOptions={{ tabBarActiveTintColor: "blue" }}>
        <Tabs.Screen
          name="index"
          options={{
            title: "Converter",
            tabBarIcon: ({ color }) => (
              <FontAwesome size={28} name="calculator" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="history"
          options={{
            title: "History",
            tabBarIcon: ({ color }) => (
              <FontAwesome size={28} name="history" color={color} />
            ),
          }}
        />
      </Tabs>
    </CurrencyProvider>
  );
}
