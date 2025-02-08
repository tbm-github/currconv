import React, { createContext, useEffect, useState } from "react";
import {
  FilterOption,
  CurrencyContextType,
  itemDataCurrencyConversion,
  HistoryContextType,
  itemHistory,
} from "../config/types";
// import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = {
  children: React.ReactNode;
};

const initialCurrencyState: CurrencyContextType = {
  fromCurrency: null,
  setFromCurrency: () => {},
  toCurrency: null,
  setToCurrency: () => {},
};

export const CurrencyContext = createContext(initialCurrencyState);

const initialHistoryConversionState: HistoryContextType = {
  saveHistory: false,
  setSaveHistory: () => {},
  arrayDataHistoryCurrencyConversion: [],
  handleAddItemConversion: () => {},
  handleCreateConversion: () => {},
};

export const HistoryConversionContext = createContext(
  initialHistoryConversionState
);

export function CurrencyProvider({ children }: Props) {
  const [fromCurrency, setFromCurrency] = useState<FilterOption | null>(null);
  const [toCurrency, setToCurrency] = useState<FilterOption | null>(null);

  const contextValue = {
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,
  };

  const [saveHistory, setSaveHistory] = useState(false);

  const [
    arrayDataHistoryCurrencyConversion,
    setArrayDataHistoryCurrencyConversion,
  ] = useState<itemDataCurrencyConversion[]>([]);

  const handleAddItemConversion = (item: itemDataCurrencyConversion) => {
    if (arrayDataHistoryCurrencyConversion.length > 29)
      arrayDataHistoryCurrencyConversion.length = 29;
    setArrayDataHistoryCurrencyConversion([
      item,
      ...arrayDataHistoryCurrencyConversion,
    ]);
  };
  const handleCreateConversion = (arr: itemDataCurrencyConversion[]) => {
    setArrayDataHistoryCurrencyConversion(arr);
  };

  const contextHistoryValue = {
    saveHistory,
    setSaveHistory,
    arrayDataHistoryCurrencyConversion,
    handleAddItemConversion,
    handleCreateConversion,
  };

  return (
    <CurrencyContext.Provider value={contextValue}>
      <HistoryConversionContext.Provider value={contextHistoryValue}>
        {children}
      </HistoryConversionContext.Provider>
    </CurrencyContext.Provider>
  );
}
