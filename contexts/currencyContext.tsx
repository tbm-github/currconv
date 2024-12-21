import React, { createContext, useState } from "react";
import { FilterOption } from "../config/types";

// import { BarButton, BottomBarContextType } from "./types";

type Props = {
  children: React.ReactNode;
};

type ContextType = {
  fromCurrency: FilterOption | null;
  setFromCurrency: Function;
  toCurrency: FilterOption | null;
  setToCurrency: Function;
};

const initialState: ContextType = {
  fromCurrency: null,
  setFromCurrency: () => {},
  toCurrency: null,
  setToCurrency: () => {},
};

export const CurrencyContext = createContext(initialState);

export function CurrencyProvider({ children }: Props) {
  const [fromCurrency, setFromCurrency] = useState<FilterOption | null>(null);
  const [toCurrency, setToCurrency] = useState<FilterOption | null>(null);

  const contextValue = {
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,
  };

  return (
    <CurrencyContext.Provider value={contextValue}>
      {children}
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
