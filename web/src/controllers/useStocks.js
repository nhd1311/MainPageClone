import { useMemo } from 'react';
import { stockData } from '../data/Data';


export function useStocks(activeTab) {
  const stocks = useMemo(() => {
    let filtered;

    if (!activeTab) {
      filtered = stockData;
    } else if (activeTab.startsWith('industry:')) {
      const key = activeTab.slice('industry:'.length);
      filtered = stockData.filter((s) => s.industry === key);
    } else {
      filtered = stockData.filter((s) => s.tab === activeTab);
    }

    return [...filtered].sort((a, b) => a.symbol.localeCompare(b.symbol));
  }, [activeTab]);

  return stocks;
}
