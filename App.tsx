import { FormCurrencyConversionMain } from "./components/FormCurrencyConversionMain";
import { CurrencyProvider } from "./contexts/currencyContext";

export default function App() {
  return (
    <CurrencyProvider>
      <FormCurrencyConversionMain />
    </CurrencyProvider>
  );
}
