export type FilterOption = {
  key: string;
  value: string;
};

export type CurrencyContextType = {
  fromCurrency: FilterOption | null;
  setFromCurrency: Function;
  toCurrency: FilterOption | null;
  setToCurrency: Function;
};

export type itemDataCurrencyConversion = {
  fromCurrency: FilterOption | null;
  toCurrency: FilterOption | null;
  value: string;
  dateStr: string;
  result: string;
};

export type itemHistory = { text: string };

export type HistoryContextType = {
  arrayDataHistoryCurrencyConversion: itemDataCurrencyConversion[];
  handleAddItemConversion: Function;
};
