import React, { createContext, useEffect, useState } from "react";
import {
  FilterOption,
  CurrencyContextType,
  itemDataCurrencyConversion,
  HistoryContextType,
  itemHistory,
} from "../config/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  arrayDataHistoryCurrencyConversion: [],
  handleAddItemConversion: () => {},
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

  const [
    arrayDataHistoryCurrencyConversion,
    setArrayDataHistoryCurrencyConversion,
  ] = useState<itemDataCurrencyConversion[]>([]);

  const handleAddItemConversion = (item: itemDataCurrencyConversion) => {
    setArrayDataHistoryCurrencyConversion([
      ...arrayDataHistoryCurrencyConversion,
      item,
    ]);
  };

  const contextHistoryValue = {
    arrayDataHistoryCurrencyConversion,
    handleAddItemConversion,
  };

  return (
    <CurrencyContext.Provider value={contextValue}>
      <HistoryConversionContext.Provider value={contextHistoryValue}>
        {children}
      </HistoryConversionContext.Provider>
    </CurrencyContext.Provider>
  );
}

// const initialState: BottomBarContextType = {
//   buttons: [],
//   setButtons: () => {},
//   hideBottomBar: () => {},
// };

// export const BottomBarContext =
//   createContext<BottomBarContextType>(initialState);

// export function BottomBarProvider({ children }: Props) {
//   const [buttons, setButtons] = useState<BarButton[]>([]);

//   const hideBottomBar = () => setButtons([]);

//   const contextValue = { buttons, setButtons, hideBottomBar };

//   return (
//     <BottomBarContext.Provider value={contextValue}>
//       {children}
//     </BottomBarContext.Provider>
//   );
// }

// export function useBottomBar() {
//   return useContext(BottomBarContext);
// }
