import { marketData } from '../data/Data';

export function getAllData() {
  return marketData;
}

export function getCardData() {
  return marketData.filter((i) => i.showCard);
}

export function formatIndexValue(value) {
  if (value == null) return '';
  return value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatIndexChange(value) {
  if (value == null) return '';
  return `${value.toFixed(2)}%`;
}

export function formatKLGD(value) {
  if (value == null || value === 0) return '0.00';
  return value.toFixed(2);
}

export function getIndexClass(change) {
  if (change > 0) return 'text-up';
  if (change < 0) return 'text-down';
  return 'text-ref';
}

export function normalizeChartData(chartData) {
  if (!chartData || chartData.length === 0) return [];

  const values = chartData.map((d) => d.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1; 

  return chartData.map((d, i) => ({
    x: i / (chartData.length - 1),      
    y: 1 - (d.value - min) / range,    
    time: d.time,
    value: d.value,
  }));
}