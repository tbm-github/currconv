export type FilterOption = {
  key: string;
  value: string;
};

export type ContextType = {
  fromCurrency: FilterOption | null;
  setFromCurrency: Function;
  toCurrency: FilterOption | null;
  setToCurrency: Function;
};
