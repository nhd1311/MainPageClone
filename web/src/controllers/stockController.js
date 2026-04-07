import { stockData } from '../data/Data';

export function filterStockData(tab) {
  if (!tab) return stockData;
  return stockData.filter((s) => s.tab === tab);
}

export function getPriceClass(price, ref, ceiling, floor) {
  if (price == null || price === 0) return '';
  if (price >= ceiling) return 'text-ceiling';
  if (price <= floor)   return 'text-floor';
  if (price > ref)      return 'text-up';
  if (price < ref)      return 'text-down';
  return 'text-ref';
}

export function getChangeClass(change) {
  if (change == null) return '';
  if (change > 0) return 'text-up';
  if (change < 0) return 'text-down';
  return 'text-ref';
}

export function formatPrice(value) {
  if (value == null || value === 0) return '';
  return value.toFixed(2);
}

export function formatVol(value) {
  if (value == null || value === 0) return '';
  return value.toFixed(1);
}

export function formatTotalVol(value) {
  if (value == null || value === 0) return '';
  return value.toLocaleString('vi-VN', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
}

export function formatPct(value) {
  if (value == null) return '';
  const sign = value > 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}%`;
}

export function formatChange(value) {
  if (value == null) return '';
  const sign = value > 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}`;
}

export function formatAvg(value) {
  if (value == null || value === 0) return '';
  return value.toFixed(2);
}

export function formatLow(value) {
  if (value == null || value === 0) return '';
  return value.toFixed(2);
}

export function formatHigh(value) {
  if (value == null || value === 0) return '';
  return value.toFixed(2);
}

export function formatOpen(value) {
  if (value == null || value === 0) return '';
  return value.toFixed(2);
}

export function formatForeign(value) {
  if (value == null || value === 0) return '';
  return value.toFixed(1);
}