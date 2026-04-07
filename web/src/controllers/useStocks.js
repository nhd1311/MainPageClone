import { useMemo } from 'react';
import { stockData } from '../data/Data';


export function useStocks(activeTab) {
  const stocks = useMemo(() => {
    const filtered = activeTab
      ? stockData.filter((s) => s.tab === activeTab)
      : stockData;

    return [...filtered].sort((a, b) => a.symbol.localeCompare(b.symbol));
  }, [activeTab]);

  return stocks;
}
